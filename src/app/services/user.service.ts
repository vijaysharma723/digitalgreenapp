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
      password: "9971696729",
      role: "vrp",
      topics: ["जल संचयन", "फसल की खेती ", "फसल उत्पाद", "पशु"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो में क्या सुधार करने की आवश्यकता है।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "सामान्य तौर पर चुनौतियां क्या हैं।",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8447818490",
      password: "8447818490",
      role: "vrp",
      topics: ["जल संचयन", "फसल उत्पाद"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो में क्या सुधार करने की आवश्यकता है।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "सामान्य तौर पर चुनौतियां क्या हैं।",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8005297302",
      password: "8005297302",
      role: "mrp",
      topics: ["जल संचयन", "फसल की खेती", "कृषि नीतियां"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_name: "प्रक्रिया में क्या सुधार की जरूरत है।",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप एमआरपी से और क्या सीखना चाहते हैं।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_name: "एमआरपी से कौन सी चुनौतियां हल हो सकती हैं।",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9312252531",
      password: "9312252531",
      role: "mrp",
      topics: ["फसल की खेती", "मृदा अपरदन", "पशु"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_name: "प्रक्रिया में क्या सुधार की जरूरत है।",
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप एमआरपी से और क्या सीखना चाहते हैं।",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_name: "एमआरपी से कौन सी चुनौतियां हल हो सकती हैं।",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9991062244",
      password: "9991062244",
      role: "block_officer",
      topics: ["फसल उत्पाद", "कीटनाशक नियंत्रण", "फसल की खेती"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_name: "प्रक्रिया में क्या सुधार की जरूरत है।",
          status: false
        },
        {
          topic_id: "2",
          isPlayed: false,
          topic_name: "आप ब्लॉक_अधिकारी से और क्या सीखना चाहते हैं।",
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_name: "ऐसी कौन सी चुनौतियाँ हैं जिन्हें ब्लॉक_अधिकारी द्वारा हल किया जा सकता है।",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9886735532",
      password: "9886735532",
      role: "block_officer",
      topics: ["कीटनाशक नियंत्रण", "कृषि नीतियां", "फसल कटाई", "दूध उत्पादन"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_name: "प्रक्रिया में क्या सुधार की जरूरत है।",
          status: false
        },
        {
          topic_id: "2",
          isPlayed: false,
          topic_name: "आप ब्लॉक_अधिकारी से और क्या सीखना चाहते हैं।",
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_name: "ऐसी कौन सी चुनौतियाँ हैं जिन्हें ब्लॉक_अधिकारी द्वारा हल किया जा सकता है।",
          status: false
        }
      ],
      sessiontoken: ""
    }
  ];
  users: any;
  loggedInUser = null;

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
