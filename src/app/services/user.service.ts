// tslint:disable: no-string-literal
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { of, BehaviorSubject } from 'rxjs';
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
    },
    {
      username: "7667299646",
      password: "7667299646",
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
      username: "9709052969",
      password: "9709052969",
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
      username: "8320510759",
      password: "8320510759",
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
      username: "8789559665",
      password: "8789559665",
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
      username: "9334695037",
      password: "9334695037",
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
      username: "6299346425",
      password: "6299346425",
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
      username: "7667465483",
      password: "7667465483",
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
      username: "9262943472",
      password: "9262943472",
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
      username: "9155683011",
      password: "9155683011",
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
      username: "6200585299",
      password: "6200585299",
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
      username: "9955652993",
      password: "9955652993",
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
      username: "8651827108",
      password: "8651827108",
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
      username: "9798293561",
      password: "9798293561",
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
      username: "9504851440",
      password: "9504851440",
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
      username: "6299511899",
      password: "6299511899",
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
      username: "8539886639",
      password: "8539886639",
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
      username: "8434638030",
      password: "8434638030",
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
      username: "8789983719",
      password: "8789983719",
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
      username: "8084203884",
      password: "8084203884",
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
      username: "8051022065",
      password: "8051022065",
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
      username: "7292876181",
      password: "7292876181",
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
      username: "7634815740",
      password: "7634815740",
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
      username: "9934337079",
      password: "9934337079",
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
      username: "6207955766",
      password: "6207955766",
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
      username: "6205018213",
      password: "6205018213",
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
      username: "9570722316",
      password: "9570722316",
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
      username: "dummyBBO",
      password: "dummyBBO",
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
      username: "dummyBMRP",
      password: "dummyBMRP",
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
      username: "dummyBVRP",
      password: "dummyBVRP",
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
      username: "dummyJBO",
      password: "dummyJBO",
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
      username: "dummyJMRP",
      password: "dummyJMRP",
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
      username: "dummyJVRP",
      password: "dummyJVRP",
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
  ];

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

   async getUserListFromLocalDB() {
    const localDBUsers = await this.storage.get('users');
    if (localDBUsers) {
      return Promise.resolve(JSON.parse(localDBUsers));
    } else {
      return Promise.resolve({users: []});
    }
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
      const newUpdatedUsersWithQuestions = this.syncQuestions(newUpdatedUsers, localUsers);
      const newUpdatedUsersWithQuesAndTopics = this.questionsSrvc.syncTopics(newUpdatedUsersWithQuestions);
      console.log('final users array to set in local db looks like ', newUpdatedUsersWithQuestions);
      const isSet = await this.setUsers(newUpdatedUsersWithQuestions);
      console.log('is properly set ?', isSet);
      return Promise.resolve({ok: true});
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
  totalUsers.users.forEach((newUser, newUserIdx) => {
    if (!newUser.hasOwnProperty('questions')) {
      // it is a first time user, assign default questions object to it
      newUser['questions'] = this.questionsSrvc.getDefaultQuestions(newUser['role']);
    } else {
      const matchedOldIdx = oldUsers['users'].findIndex(oldUser => oldUser['username'].toLowerCase() === newUser['username'].toLowerCase());
      // tslint:disable-next-line: max-line-length
      const mergedQuestions = this.questionsSrvc.updateQuestions(oldUsers['users'][matchedOldIdx]['questions'], oldUsers['users'][matchedOldIdx]['role'])
      newUser['questions'] = mergedQuestions;
    }
});
  return totalUsers;
  }
}
