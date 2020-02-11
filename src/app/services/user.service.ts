import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

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
      password: "9971696729",
      role: "vrp",
      topics: [
        "Water Harvesting",
        "Crop Cultivation",
        "Crop Production",
        "Livestock"
      ],
      questions: [
        {
          topic_id: "1",
          topic_name: "What needs to be improved in the video.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general.",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8447818490",
      password: "8447818490",
      role: "vrp",
      topics: ["Water Harvesting", "Crop Production"],
      questions: [
        {
          topic_id: "1",
          topic_name: "What needs to be improved in the video.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general.",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8005297302",
      password: "8005297302",
      role: "mrp",
      topics: ["Water Harvesting", "Crop Cultivation", "Agriculture Policies"],
      questions: [
        {
          topic_id: "1",
          topic_name: "What needs to be improved in the video by MRP.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more by MRP.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general by MRP.",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9312252531",
      password: "9312252531",
      role: "mrp",
      topics: ["Crop Cultivation", "Soil Erosion", "Livestock"],
      questions: [
        {
          topic_id: "1",
          topic_name: "What needs to be improved in the video by MRP.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more by MRP.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general by MRP.",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9991062244",
      password: "9991062244",
      role: "block_officer",
      topics: ["Crop Production", "Pesticide Control", "Crop Cultivation"],
      questions: [
        {
          topic_id: "1",
          topic_name:
            "What needs to be improved in the video by BLOCK_OFFICER.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more by BLOCK_OFFICER.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general by BLOCK_OFFICER.",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9886735532",
      password: "9886735532",
      role: "block_officer",
      topics: [
        "Pesticide Control",
        "Agriculture Policies",
        "Crop Harvesting",
        "Dairy Farming"
      ],
      questions: [
        {
          topic_id: "1",
          topic_name:
            "What needs to be improved in the video by BLOCK_OFFICER.",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "What do you want to learn more by BLOCK_OFFICER.",
          status: false
        },
        {
          topic_id: "3",
          topic_name: "What are the challenges in general by BLOCK_OFFICER.",
          status: false
        }
      ],
      sessiontoken: ""
    }
  ];
  users: any;
  loggedInUser = null;
  public username = new BehaviorSubject<any>("");

  constructor(private storage: Storage) {}

  async validateUserDetails(username, password) {
    const users = this.getUserList();
    let userdetails;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.username === username.trim() && user.password === password) {
        userdetails = { ...user };
        userdetails["sessiontoken"] = this.getMasterToken();
        const status = await this.setLoggedInUser(userdetails);
        this.username.next(username);
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

  async getUserTopics() {
    const user = await this.getLoggedInUser();
    if (!!user) {
      return user["topics"];
    } else {
      return [];
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
}
