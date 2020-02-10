import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

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
  private userlist = [
    {
      username: "9971696729",
      password: "12345",
      role: "vrp",
      topics: [
        "Water Harvesting",
        "Crop Cultivation",
        "Crop Production",
        "Livestock"
      ],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    },
    {
      username: "23456",
      password: "23456",
      role: "vrp",
      topics: ["Water Harvesting", "Crop Production"],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    },
    {
      username: "34567",
      password: "34567",
      role: "mrp",
      topics: ["Water Harvesting", "Crop Cultivation", "Agriculture Policies"],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    },
    {
      username: "45678",
      password: "45678",
      role: "mrp",
      topics: ["Crop Cultivation", "Soil Erosion", "Livestock"],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    },
    {
      username: "56789",
      password: "56789",
      role: "block_officer",
      topics: ["Crop Production", "Pesticide Control", "Crop Cultivation"],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    },
    {
      username: "67890",
      password: "67890",
      role: "block_officer",
      topics: [
        "Pesticide Control",
        "Agriculture Policies",
        "Crop Harvesting",
        "Dairy Farming"
      ],
      questions: [
        "What needs to be improved in the video.",
        "What do you want to learn more.",
        "What are the challenges in general."
      ],
      sessiontoken: ""
    }
  ];
  users: any;
  loggedInUser = null;

  constructor(private storage: Storage) { }

  async validateUserDetails(username, password) {
    const users = this.getUserList();
    let userdetails;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.username === username.trim() && user.password === password) {
        console.log("inside if", i);
        userdetails = { ...user };
        userdetails["sessiontoken"] = this.getMasterToken();
        var status = await this.setLoggedInUser(userdetails);
        return 1;
      } else if (user.username === username.trim()) {
        console.log("inside else if", i);

        return 0;
      }
      console.log("outside if");

    }
    return -1;

  }

  getUserTopics() {
    return this.loggedInUser["topics"];
  }

  getUserQuestions() {
    return this.loggedInUser["questions"];
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
      let loggedinuser = await this.storage.get(
        "loggedinuser");
      this.loggedInUser = JSON.parse(loggedinuser);
    }
    return this.loggedInUser;
  }

  getMasterToken() {
    return this.masterToken;
  }

  endSession() {
    this.storage.remove("loggedinuser");
  }

  getUserList() {
    return [...this.userlist];
  }


  clearUserList() {
    this.storage.remove("users");
  }
}
