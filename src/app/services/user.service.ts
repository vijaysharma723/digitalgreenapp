import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private username = "";
private userdetails = {};
private masterToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys";
private userlist = [{
    "username": "12345",
    "password": "12345",
    "role": "vrp",
    "topics": ["Water Harvesting","Crop Cultivation","Crop Production","Livestock"],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}, {
    "username": "23456",
    "password": "23456",
    "role": "vrp",
    "topics": ["Water Harvesting","Crop Production"],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}, {
    "username": "34567",
    "password": "34567",
    "role": "mrp",
    "topics": ["Water Harvesting","Crop Cultivation","Agriculture Policies"],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}, {
    "username": "45678",
    "password": "45678",
    "role": "mrp",
    "topics": ["Crop Cultivation","Soil Erosion","Livestock"],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}, {
    "username": "56789",
    "password": "56789",
    "role": "block_officer",
    "topics": ["Crop Production","Pesticide Control","Crop Cultivation"],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}, {
    "username": "67890",
    "password": "67890",
    "role": "block_officer",
    "topics": ["Pesticide Control","Agriculture Policies","Crop Harvesting","Dairy Farming",],
    "questions":["What needs to be improved in the video.","What do you want to learn more.","What are the challenges in general."],
    "sessiontoken": ""
}];

  constructor() { }

validateUserDetails(username, password) {

console.log(username);
console.log(password);
  for (let i=0; i<this.userlist.length; i++) {
    const user = this.userlist[i];
    console.log(user);
    if(user.username===username.trim() && user.password===password) {
      return 1;
      this.username = "" + user.username;
      this.userdetails = { ...user };
      break;
    }
    else if(user.username===username.trim()) {
      return 0;
      break;
    }
    return -1;
  }
}

createSession() {
  for (let i=0; i<this.userlist.length; i++) {
    const user = this.userlist[i];
    if (user.username===this.username) {
      user['sessiontoken'] = "" + this.masterToken;
      break;
      }
    }
  }

endSession() {
  for (let i=0; i<this.userlist.length; i++) {
    const user = this.userlist[i];
    if (user.username===this.username) {
      user['sessiontoken'] = "";
      break;
      }
    }
  }

  getUserTopics() {
    return this.userdetails['topics'];
  }

  getUserQuestions() {
    return this.userdetails['questions'];
  }

  getUserList() {
    return { ...this.userlist };
  }

// setUserList() {

// }
}
