import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
private sharedData;
private sessionlist=[{
        "sessionid":"1580896310513",
        "name": "Water Harvesting",
        "created": "Mon Feb 03 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": false
            }
        ]
    },
    {"sessionid":"1580896310514",
        "name": "Population control",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": true,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            }
        ]
    }, {
      "sessionid":"1580896310515",
        "name": "Air control",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }, {
      "sessionid":"1580896310516",
        "name": "Crop pesti",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }, {"sessionid":"1580896310517",
        "name": "Noise control",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }, {
      "sessionid":"1580896310518",
        "name": "Rice meal control",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }, {
      "sessionid":"1580896310519",
        "name": "Control",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }, {
      "sessionid":"1580896310520",
        "name": "Weather Understanding",
        "created": "Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)",
        "isUploaded": false,
        "topics": [{
                "topic_name": "What needs to be improved in the video.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What do you want to learn more.",
                "file_data": {
                    "bucketname": "app-blob-storage",
                    "foldername": "Agricultural problems in haryana uuid-1234567890-client",
                    "file_url": "Challenges faced/mono_mono_Cucumber cucumber farming _ खीरा ककड़ी की खेती _ Preparation & management _ बांस के मंडप वाली खेती -8_kqqXQNFM,U.wav",
                    "ismono": false
                },
                "isUploaded": true
            },
            {
                "topic_name": "What are the challenges in general.",
                "isUploaded": false
            }
        ]
    }
];
  constructor() {
  }

getSessionList() {
return this.sessionlist;
}

  getSharedData() {
    return this.sharedData;
  }
  createUniqueId(){
      return UUID.UUID();
  }
  getSessionById(id) {
    const sessionData = this.sessionlist.filter((el)=>{
      return el.sessionid===id
      });
      return sessionData;
  }

  addNewSession(sessionData) {
    this.sessionlist.unshift(sessionData);
  }

  setSharedData(sessionData: object) {
    console.log('Session Data : ',sessionData);
    this.sharedData=sessionData;
  }

  updateSessionTopicData(sessionId, topicName, file) {
    const sessionData = this.getSessionById(sessionId)[0];

    let topicData:any = sessionData['topics'].filter((element)=>{
      return element.topic_name===topicName;
      });
       topicData= topicData[0];
       topicData['isUploaded'] = false;
      topicData['file_data'] = {};
      topicData['file_data']['bucketname'] = "app-blob-storage";
      topicData['file_data']['foldername'] = file;
      topicData['file_data']['file_url'] = "www.vidoeurl.com";
      topicData['file_data']['ismono'] = false;
      console.log("New Session Data : ",sessionData);
  }

  uploadTopicDataToCloud(sessionId, topicId) {
      const sessionData = this.getSessionById(sessionId)[0];
          let topicData:any = sessionData['topics'].filter((element)=>{
      return element.topic_name===topicId;
      });
       topicData= topicData[0];
       topicData['isUploaded'] = true;
  }

}
