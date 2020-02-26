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
      username: "sumit",
      password: "sumit",
      role: "block_officer",
      topics: ["कीटनाशक नियंत्रण", "कृषि नीतियां", "फसल कटाई", "दूध उत्पादन"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किसानों को किन शीर्ष चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "2",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किसानों को किन शीर्ष स्वास्थ्य चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "4",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "deepak",
      password: "deepak",
      role: "mrp",
      topics: ["जल संचयन", "फसल की खेती", "कृषि नीतियां"],
      questions: [
        {
          topic_id: "1",
          topic_name: "प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "किसानों द्वारा सामना किए गए शीर्ष चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "वीआरपी के सामने जमीनी स्तर की चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "rishabh",
      password: "rishabh",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9999999999",
      password: "9999999999",
      role: "block_officer",
      topics: ["कीटनाशक नियंत्रण", "कृषि नीतियां", "फसल कटाई", "दूध उत्पादन"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किसानों को किन शीर्ष चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "2",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किसानों को किन शीर्ष स्वास्थ्य चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "4",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8888888888",
      password: "8888888888",
      role: "block_officer",
      topics: ["कीटनाशक नियंत्रण", "कृषि नीतियां", "फसल कटाई", "दूध उत्पादन"],
      questions: [
        {
          topic_id: "1",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किसानों को किन शीर्ष चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "2",
          isPlayed: false,
          topic_title: 'कृषि',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        },
        {
          topic_id: "3",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किसानों को किन शीर्ष स्वास्थ्य चुनौतियों का सामना करना पड़ रहा है?",
          status: false
        },
        {
          topic_id: "4",
          isPlayed: false,
          topic_title: 'स्वास्थ्य',
          topic_name: "किस प्रकार के समाधान आपकी सहायता कर सकते हैं?",
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9199337445",
      password: "9199337445",
      role: "mrp",
      topics: ["जल संचयन", "फसल की खेती", "कृषि नीतियां"],
      questions: [
        {
          topic_id: "1",
          topic_name: "प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "किसानों द्वारा सामना किए गए शीर्ष चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "वीआरपी के सामने जमीनी स्तर की चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9304701490",
      password: "9304701490",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "6209551473",
      password: "6209551473",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7667327735",
      password: "7667327735",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7070188403",
      password: "7070188403",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "6206516837",
      password: "6206516837",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "9661147249",
      password: "9661147249",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7250023714",
      password: "7250023714",
      role: "mrp",
      topics: ["जल संचयन", "फसल की खेती", "कृषि नीतियां"],
      questions: [
        {
          topic_id: "1",
          topic_name: "प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "किसानों द्वारा सामना किए गए शीर्ष चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "वीआरपी के सामने जमीनी स्तर की चुनौतियां क्या हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8757370197",
      password: "8757370197",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7564990517",
      password: "7564990517",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7250018963",
      password: "7250018963",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8825323243",
      password: "8825323243",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "8207525531",
      password: "8207525531",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
          status: false
        }
      ],
      sessiontoken: ""
    },
    {
      username: "7782848115",
      password: "7782848115",
      role: "vrp",
      topics: ["कृषि", "स्वास्थ्य"],
      questions: [
        {
          topic_id: "1",
          topic_name: "वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "2",
          topic_name: "आप और क्या सीखना चाहते हैं?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "3",
          topic_name: "आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?",
          isPlayed: false,
          status: false
        },
        {
          topic_id: "4",
          topic_name: "ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?",
          isPlayed: false,
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
