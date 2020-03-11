import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class UserSyncService {

  private APIEndpoint = 'https://e05cf17f.ngrok.io/user/list';
  // private APIEndpoint = 'http://52.221.207.221:3001/user/list';
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly toaster: ToasterService) { }

  /**
   * Syncs users This function is responsoble to detect whether to add new users from server db to local db.
   * This is only performed if the user is connected to internet
   */
  async syncUsers() {
    console.log('syncing users initiated');
    if (window.navigator.onLine) {
      console.log('user is online, starting user sync');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA5ODg5Njd9.H6xfNNNe2kUVBF-FBG8ChB1b_j2tMBnmJQOsafPxwNo'
        })
      };
      this.http.post(this.APIEndpoint, {users: []}, httpOptions).subscribe(async response => {
        if (response['status'] === 200) {
          this.updateUsers(response['users']);
        // update the local user list with remote userlist
        } else {
          console.log('An unexpected status code recieved while retrieving remote users', response);
          console.log('will try to sync users later!');
        }
      }, err => {
        console.log('An Error occured while reading users from remote db', err);
        console.log('will try again later');
      });

    }
  }

  updateUsers(remoteUsers) {
    console.log('recieved remote users as ', remoteUsers);
    const parsedUsers = this.parseUsers(remoteUsers);
    this.userService.updateUsers(parsedUsers)
    .then(isUpdated => {
      console.log('users now updated ', isUpdated);
      // trigger a toaster to show users have been synced
      if (isUpdated['ok']) {
        this.toaster.present({
          text: this.toaster.toasterMessage.userSyncSuccess,
          colour: "light"
        });
      }
    })
    .catch(updateFailed => {
      console.log('recieved error while updating users in the local db', updateFailed);
      console.log('will try aother time');
      this.toaster.present({
        text: this.toaster.toasterMessage.userSyncFailed,
        colour: "danger"
      });
    });
  }

  parseUsers(usersArray) {
    return usersArray.map((userObject, index) => {
      console.log('mapping ', userObject);
      return {username: userObject.username, password: userObject.password, email: userObject.email, role: userObject.role};
    });
  }
}
