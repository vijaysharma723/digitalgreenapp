// tslint:disable: no-string-literal
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from 'rxjs';
import { QuestionsService } from './questions/questions.service';

export interface IUser {
  username: string;
  password: string;
  role: string;
  topics: Array<string>;
  questions: Array<string>;
  sessionToken: string;
}
@Injectable({
  providedIn: "root"
})
export class UserService {
  private masterToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys";

  users: any;
  loggedInUser = null;
  public userDetailsObs = new BehaviorSubject<object|null>(null);

  constructor(
    private storage: Storage,
    private questionsSrvc: QuestionsService,
    ) {}

  async validateUserDetails(username, password) {
    const localUsers = await this.getUserList();
    const users = localUsers['users'] || [];
    let userdetails;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.username.toLowerCase() === username.toLowerCase().trim() && user.password === password) {
        userdetails = { ...user };
        userdetails["sessiontoken"] = this.getMasterToken();
        const status = await this.setLoggedInUser(userdetails);
        if (status) {
          return 1;
        } else {
          return -10;
        }
      } else if (user.username === username.trim()) {
        return 0;
      }
    }
    return -1;
  }

  async getUserTopics(lang?: string) {
    const user = await this.getLoggedInUser();
    if (!!user) {
      if (lang && lang !== 'hi') {
        return user['topics'][lang];
      } else {
        // if no language is sent or hi is sent, return with hindi array
        return user['topics']['hi'];
      }
    }
  }

  async getUserQuestions() {
    const user = await this.getLoggedInUser();
    if (!!user) {
      return user["questions"];
    } else {
      return [];
    }
  }

  async setLoggedInUser(userdetails) {
    const loggedinuser = await this.storage.set(
      "loggedinuser",
      JSON.stringify(userdetails)
    );
    this.loggedInUser = userdetails;
    return loggedinuser;
  }

  async getLoggedInUser() {
    if (!this.loggedInUser) {
      const loggedinuser = await this.storage.get("loggedinuser");
      this.loggedInUser = JSON.parse(loggedinuser);
    }
    // emit the userdetails as observable as well
    this.userDetailsObs.next(this.loggedInUser);
    return this.loggedInUser;
  }

  getMasterToken() {
    return this.masterToken;
  }

  endSession() {
    this.storage.remove("loggedinuser");
  }

  async getUserList() {
    // return [...this.userlist];
    const users = await this.storage.get('users');
    if (users && users.length) {
      return JSON.parse(users);
    } else {
      return [];
    }
  }

  async getUserRole() {
    const user = await this.getLoggedInUser();
    if (!!user) {
      return user["role"];
    } else {
      return null;
    }
  }

  clearUserData() {
    this.users = [];
    this.loggedInUser = null;
  }

   getUserListFromLocalDB() {
     return this.storage.get('users').then(localDBUsers => {
      if (localDBUsers) {
        return Promise.resolve(JSON.parse(localDBUsers));
      } else {
        return Promise.resolve({users: []});
      }
     });
  }

  async setUsers(usersArray) {
    const isSet = await this.storage.set('users', JSON.stringify(usersArray));
    return Promise.resolve(isSet);
  }

  async updateUsers(updatedUsersArray) {
    const localUsers = await this.getUserListFromLocalDB();
    if (localUsers) {
      // merge the users
      const newUpdatedUsers = this.mergeUsers(updatedUsersArray, localUsers['users']);
      // assign proper questions to the user Objects if they don't have it
      const newUpdatedUsersWithQuestions = await this.syncQuestions(newUpdatedUsers, localUsers);
      if (newUpdatedUsersWithQuestions) {
        const newUpdatedUsersWithQuesAndTopics = await this.questionsSrvc.syncTopics(newUpdatedUsersWithQuestions);
        if (newUpdatedUsersWithQuesAndTopics) {
          const isSet = await this.setUsers({users: newUpdatedUsersWithQuesAndTopics});
          // console.log('is properly set ?', isSet);
          return Promise.resolve({ok: true});
        }
      }
    } else {
      console.log('users not available in local db to update');
      return Promise.reject({ok: false, error: 'users not available in local db to update'});
    }
  }

  mergeUsers(newUsers, oldUsers) {
    console.log('new users are ', newUsers);
    console.log('old users are ', oldUsers);
    const mergedUsers = [];
    newUsers.forEach(user => {
      const existingLocalIdx = oldUsers.findIndex(localUser => {
        return (localUser['username'].toLowerCase() === user['username'].toLowerCase())
      });
      if (existingLocalIdx > -1) {
        // to make sure we also retain the old topics
        mergedUsers.push({...oldUsers[existingLocalIdx], ...user, topics: oldUsers[existingLocalIdx]['topics']});
      } else {
        // new user, add it in the updatedlist
        mergedUsers.push(user);
      }
    });
    // clean the old users which no longer exist in the remote db as well
    const updatedUsers = this.cleanObsoleteUsers(mergedUsers, newUsers);
    // console.log('final merged users look like ', updatedUsers);
    return {users: updatedUsers};
  }

  /**
   * Cleans obsolete users. The purpose is to remove those users from the app whose details are no longer available in the remote db
   * @param mergedUsers 
   * @param remoteUsers 
   */
  cleanObsoleteUsers(mergedUsers, remoteUsers) {
    const cleanedUsers = mergedUsers.filter(user => {
      return (remoteUsers.findIndex(remoteUser => remoteUser['username'].toLowerCase() === user['username'].toLowerCase()) > -1)
    });
    return cleanedUsers;
  }

  syncQuestions(totalUsers, oldUsers) {
  // to make sure that users who have attempted there questions, they are not lost
  const usersMergedWithQuestions = Promise.all(totalUsers.users.map(async (newUser) => {
    if (!newUser.hasOwnProperty('questions')) {
      // it is a first time user, assign default questions object to it
      newUser['questions'] = await this.questionsSrvc.getDefaultQuestions(newUser['role']);
    } else {
      const matchedOldIdx = oldUsers['users'].findIndex(oldUser => oldUser['username'].toLowerCase() === newUser['username'].toLowerCase());
      // tslint:disable-next-line: max-line-length
      const mergedQuestions = await this.questionsSrvc.updateQuestions(oldUsers['users'][matchedOldIdx]['questions'], oldUsers['users'][matchedOldIdx]['role'])
      newUser['questions'] = mergedQuestions;
    }
    return newUser;
}));
  return usersMergedWithQuestions;
  }
}
