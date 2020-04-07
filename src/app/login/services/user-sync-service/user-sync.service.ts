import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserSyncService {

  // private APIEndpoint = 'https://db0ce24a.ngrok.io/user/list';
  private APIEndpoint = 'http://socion-pda-dashboard.stackroute.com:3015/user/list';
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly toaster: ToasterService,
    private readonly translate: TranslateService) { }

  private defaultUsers = [
  {
    "username": "sumit",
    "password": "sumit",
    "role": "block_officer",
    "email": "sumit@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "deepak",
    "password": "deepak",
    "role": "mrp",
    "email": "deepak@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "rishabh",
    "password": "rishabh",
    "role": "vrp",
    "email": "rishabh@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9999999999",
    "password": "9999999999",
    "role": "block_officer",
    "email": "9999999999@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8888888888",
    "password": "8888888888",
    "role": "block_officer",
    "email": "8888888888@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9199337445",
    "password": "9199337445",
    "role": "mrp",
    "email": "9199337445@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9304701490",
    "password": "9304701490",
    "role": "vrp",
    "email": "9304701490@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6209551473",
    "password": "6209551473",
    "role": "vrp",
    "email": "6209551473@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7667327735",
    "password": "7667327735",
    "role": "vrp",
    "email": "7667327735@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7070188403",
    "password": "7070188403",
    "role": "vrp",
    "email": "7070188403@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6206516837",
    "password": "6206516837",
    "role": "vrp",
    "email": "6206516837@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9661147249",
    "password": "9661147249",
    "role": "vrp",
    "email": "9661147249@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7250023714",
    "password": "7250023714",
    "role": "mrp",
    "email": "7250023714@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8757370197",
    "password": "8757370197",
    "role": "vrp",
    "email": "8757370197@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7564990517",
    "password": "7564990517",
    "role": "vrp",
    "email": "7564990517@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7250018963",
    "password": "7250018963",
    "role": "vrp",
    "email": "7250018963@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8825323243",
    "password": "8825323243",
    "role": "vrp",
    "email": "8825323243@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8207525531",
    "password": "8207525531",
    "role": "vrp",
    "email": "8207525531@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7782848115",
    "password": "7782848115",
    "role": "vrp",
    "email": "7782848115@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7667299646",
    "password": "7667299646",
    "role": "vrp",
    "email": "7667299646@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9709052969",
    "password": "9709052969",
    "role": "vrp",
    "email": "9709052969@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8320510759",
    "password": "8320510759",
    "role": "vrp",
    "email": "8320510759@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8789559665",
    "password": "8789559665",
    "role": "vrp",
    "email": "8789559665@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9334695037",
    "password": "9334695037",
    "role": "vrp",
    "email": "9334695037@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6299346425",
    "password": "6299346425",
    "role": "vrp",
    "email": "6299346425@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7667465483",
    "password": "7667465483",
    "role": "vrp",
    "email": "7667465483@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9262943472",
    "password": "9262943472",
    "role": "vrp",
    "email": "9262943472@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9155683011",
    "password": "9155683011",
    "role": "vrp",
    "email": "9155683011@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6200585299",
    "password": "6200585299",
    "role": "vrp",
    "email": "6200585299@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9955652993",
    "password": "9955652993",
    "role": "vrp",
    "email": "9955652993@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8651827108",
    "password": "8651827108",
    "role": "vrp",
    "email": "8651827108@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9798293561",
    "password": "9798293561",
    "role": "vrp",
    "email": "9798293561@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9504851440",
    "password": "9504851440",
    "role": "mrp",
    "email": "9504851440@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6299511899",
    "password": "6299511899",
    "role": "mrp",
    "email": "6299511899@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8539886639",
    "password": "8539886639",
    "role": "mrp",
    "email": "8539886639@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8434638030",
    "password": "8434638030",
    "role": "mrp",
    "email": "8434638030@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8789983719",
    "password": "8789983719",
    "role": "vrp",
    "email": "8789983719@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8084203884",
    "password": "8084203884",
    "role": "vrp",
    "email": "8084203884@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "8051022065",
    "password": "8051022065",
    "role": "vrp",
    "email": "8051022065@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7292876181",
    "password": "7292876181",
    "role": "vrp",
    "email": "7292876181@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7634815740",
    "password": "7634815740",
    "role": "vrp",
    "email": "7634815740@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9934337079",
    "password": "9934337079",
    "role": "vrp",
    "email": "9934337079@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6207955766",
    "password": "6207955766",
    "role": "vrp",
    "email": "6207955766@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "6205018213",
    "password": "6205018213",
    "role": "vrp",
    "email": "6205018213@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9570722316",
    "password": "9570722316",
    "role": "block_officer",
    "email": "9570722316@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyBBO",
    "password": "dummyBBO",
    "role": "block_officer",
    "email": "dummyBBO@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyBMRP",
    "password": "dummyBMRP",
    "role": "mrp",
    "email": "dummyBMRP@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyBVRP",
    "password": "dummyBVRP",
    "role": "vrp",
    "email": "dummyBVRP@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyJBO",
    "password": "dummyJBO",
    "role": "block_officer",
    "email": "dummyJBO@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyJMRP",
    "password": "dummyJMRP",
    "role": "mrp",
    "email": "dummyJMRP@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "dummyJVRP",
    "password": "dummyJVRP",
    "role": "vrp",
    "email": "dummyJVRP@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "7903261648",
    "password": "7903261648",
    "role": "mrp",
    "email": "7903261648@xyz.com",
    "sessiontoken": ""
  },
  {
    "username": "9939400724",
    "password": "9939400724",
    "role": "block_officer",
    "email": "9939400724@xyz.com",
    "sessiontoken": ""
  }
];

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

    } else {
      console.log('user is offline, verifying if we need to update user local db');
      const localUsers = await this.userService.getUserListFromLocalDB();
      if (!localUsers.users.length) {
        console.log('no users found in local store in offline mode, loading default users');
        this.updateUsers(this.defaultUsers);
      } else {
        console.log(`there are some users in local db in offline mode, dont't do anything`);
      }
    }
  }

  async syncOfflineUsers() {
    // check if there are users in the local store, add if there isn't
    this.syncUsers();
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
          text: this.translate.instant('userSyncSuccess'),
          colour: "light"
        });
      }
    })
    .catch(updateFailed => {
      console.log('recieved error while updating users in the local db', updateFailed);
      console.log('will try aother time');
      this.toaster.present({
        text: this.translate.instant('userSyncFailed'),
        colour: "danger"
      });
    });
  }

  parseUsers(usersArray) {
    return usersArray.map((userObject, index) => {
      // console.log('mapping ', userObject);
      return {username: userObject.username, password: userObject.password, email: userObject.email, role: userObject.role};
    });
  }
}
