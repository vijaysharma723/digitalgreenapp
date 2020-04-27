// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/shared/api-config/api-config.service';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {


  private questions = [
    {
      topics: ['कृषि', 'स्वास्थ्य'],
      role: 'vrp',
      questions: [
        {
          topic_id: '1',
          topic_name: 'वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?',
          isPlayed: false,
          status: false
        },
        {
          topic_id: '2',
          topic_name: 'आप और क्या सीखना चाहते हैं?',
          isPlayed: false,
          status: false
        },
        {
          topic_id: '3',
          topic_name: 'आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?',
          isPlayed: false,
          status: false
        },
        {
          topic_id: '4',
          topic_name: 'ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?',
          isPlayed: false,
          status: false
        }
      ],
    },
    {
      topics: ['जल संचयन', 'फसल की खेती', 'कृषि नीतियां'],
      role: 'mrp',
      questions: [
        {
          topic_id: '1',
          topic_name: 'प्रक्रिया में क्या सुधार करने की आवश्यकता है?',
          isPlayed: false,
          status: false
        },
        {
          topic_id: '2',
          topic_name: 'किसानों द्वारा सामना किए गए शीर्ष चुनौतियां क्या हैं?',
          isPlayed: false,
          status: false
        },
        {
          topic_id: '3',
          topic_name: 'वीआरपी के सामने जमीनी स्तर की चुनौतियां क्या हैं?',
          isPlayed: false,
          status: false
        }
      ],
    },
    {
      topics: ['कीटनाशक नियंत्रण', 'कृषि नीतियां', 'फसल कटाई', 'दूध उत्पादन'],
      role: 'block_officer',
      questions: [{
        topic_id: '1',
        isPlayed: false,
        topic_title: 'कृषि',
        topic_name: 'किसानों को किन शीर्ष चुनौतियों का सामना करना पड़ रहा है?',
        status: false
      },
      {
        topic_id: '2',
        isPlayed: false,
        topic_title: 'कृषि',
        topic_name: 'किस प्रकार के समाधान आपकी सहायता कर सकते हैं?',
        status: false
      },
      {
        topic_id: '3',
        isPlayed: false,
        topic_title: 'स्वास्थ्य',
        topic_name: 'किसानों को किन शीर्ष स्वास्थ्य चुनौतियों का सामना करना पड़ रहा है?',
        status: false
      },
      {
        topic_id: '4',
        isPlayed: false,
        topic_title: 'स्वास्थ्य',
        topic_name: 'किस प्रकार के समाधान आपकी सहायता कर सकते हैं?',
        status: false
      }],
    }
  ];


  procedure = [
    {
      role: 'vrp',
      questions: [
        {
          topic_id: '1',
          topic_status: '-1',
          topic_name:
          {
            en: 'What needs to be improved in the video and broadcast process?',
            hi: 'वीडियो और प्रसार प्रक्रिया में क्या सुधार करने की आवश्यकता है?'
          },
          isPlayed: false,
          status: false
        }, {
          topic_id: '2',
          topic_status: '-1',
          topic_name: {
            en: 'What else do you want to learn?',
            hi: 'आप और क्या सीखना चाहते हैं?'
          },
          isPlayed: false,
          status: false
        },
        {
          topic_id: '3',
          topic_status: '-1',
          topic_name: {
            en: 'What challenges do you face in today\'s era?',
            hi: 'आज के दौर में आपको किन चुनौतियों का सामना करना पड़ता है?'
          },
          isPlayed: false,
          status: false
        },
        {
          topic_id: '4',
          topic_status: '-1',
          topic_name: {
            en: 'What are the remedies that can help you?',
            hi: 'ऐसे कौन से उपाय हैं जो आपकी मदद कर सकते हैं?'
          },
          isPlayed: false,
          status: false
        }
      ],
      topics: {
        en: ['Agriculture', 'Health'],
        hi: ['कृषि', 'स्वास्थ्य']
      }
    },
    {
      role: 'mrp',
      topics: {
        en: ['Water Harvesting', 'Crop Farming', 'Agricultural Policies'],
        hi: ['जल संचयन', 'फसल की खेती', 'कृषि नीतियां']
      },
      questions: [
        {
          topic_id: '1',
          topic_status: '-1',
          topic_name: {
            en: 'What improvements need to be done in the process?',
            hi: 'प्रक्रिया में क्या सुधार करने की आवश्यकता है?'
          },
          isPlayed: false,
          status: false
        },
        {
          topic_id: '2',
          topic_status: '-1',
          topic_name: {
            en: 'What are the top challenges faced by farmers?',
            hi: 'किसानों द्वारा सामना किए गए शीर्ष चुनौतियां क्या हैं?'
          },
          isPlayed: false,
          status: false
        },
        {
          topic_id: '3',
          topic_status: '-1',
          topic_name: {
            en: 'What are the ground level challenges faced by VRP?',
            hi: 'वीआरपी के सामने जमीनी स्तर की चुनौतियां क्या हैं?'
          },
          isPlayed: false,
          status: false
        }
      ]
    },
    {
      role: 'block_officer',
      topics: {
        en: ['Pesticide Control', 'Agricultural Policies', 'Harvesting', 'Milk Production'],
        hi: ['कीटनाशक नियंत्रण', 'कृषि नीतियां', 'फसल कटाई', 'दूध उत्पादन']
      },
      questions: [
        {
          topic_id: '1',
          topic_status: '-1',
          isPlayed: false,
          topic_title: {hi: 'कृषि', en: 'Agriculture'},
          topic_name: {
            en: 'What are the top challenges faced by the farmers?',
            hi: 'किसानों को किन शीर्ष चुनौतियों का सामना करना पड़ रहा है?'
          },
          status: false
        }, {
          topic_id: '2',
          topic_status: '-1',
          isPlayed: false,
          topic_title: {hi: 'कृषि', en: 'Agriculture'},
          topic_name: {
            en: 'What kind of solutions can help you?',
            hi: 'किस प्रकार के समाधान आपकी सहायता कर सकते हैं?'
          },
          status: false
        },
        {
          topic_id: '3',
          topic_status: '-1',
          isPlayed: false,
          topic_title: {hi: 'स्वास्थ्य', en: 'Health'},
          topic_name: {
            en: 'What top health challenges faced by the farmers?',
            hi: 'किसानों को किन शीर्ष स्वास्थ्य चुनौतियों का सामना करना पड़ रहा है?'
          },
          status: false
        },
        {
          topic_id: '4',
          topic_status: '-1',
          isPlayed: false,
          topic_title: {hi: 'स्वास्थ्य', en: 'Health'},
          topic_name: {
            en: 'What kind of solutions can help you?',
            hi: 'किस प्रकार के समाधान आपकी सहायता कर सकते हैं?'
          },
          status: false
        }
      ]
    }
  ];

  constructor(
    private readonly apiConfig: ApiConfigService,
    private readonly storage: Storage) {}

  getDefaultQuestions(role): Promise<any> {
    return new Promise((resolve, rej) => {
      this.getRolesInfoFromLocalDB().then((questions: Array<object>) => {
        if (questions) {
          const questionIdx = questions.findIndex(questionObj => questionObj['role'].toLowerCase() === role.toLowerCase());
          resolve(questions[questionIdx]['questions']);
        } else {
          console.log('did not recieve question from local db');
          resolve(null);
        }
      });
    });
  }

  async updateQuestions(userQuestionsArray, role) {
    const defaultQuestions = await this.getDefaultQuestions(role);
    if (defaultQuestions) {
      const mergedQuestionsArray = userQuestionsArray.map(userQuestionObj => {
        const selectedDefaultQObjIdx = defaultQuestions.findIndex(defaultQuestionObj => defaultQuestionObj['topic_id'].toLowerCase() === userQuestionObj['topic_id'].toLowerCase());
        if (selectedDefaultQObjIdx > -1) {
          userQuestionObj['topic_name'] = defaultQuestions[selectedDefaultQObjIdx]['topic_name'];
          // update topic_name as well
          if (!defaultQuestions[selectedDefaultQObjIdx].hasOwnProperty('topic_title')) {
            // existing user may topic_title but remote user does not
            // delete the topic_title key from local user as well
            delete userQuestionObj['topic_title'];
          } else if (defaultQuestions[selectedDefaultQObjIdx].hasOwnProperty('topic_title')) {
            // existing user does may has topic_title but remote user has it
            // copy it in local user as well
            userQuestionObj['topic_title'] = defaultQuestions[selectedDefaultQObjIdx]['topic_title'];
          }
          // logic below will work if there is any new key added in remote user which also needs to be updated in local user
          if (Object.keys(userQuestionObj).length < Object.keys(defaultQuestions[selectedDefaultQObjIdx]).length) {
            // if there are new keys added to the question object, simply add them to the user Questions as well
            Object.keys(defaultQuestions[selectedDefaultQObjIdx]).forEach(key => {
              if (!Object.keys(userQuestionObj).includes(key)) {
                userQuestionObj[key] = defaultQuestions[selectedDefaultQObjIdx][key];
              }
            });
          }
        }
        return userQuestionObj;
      });
      return mergedQuestionsArray;
    }
  }

  syncTopics(TotaluserArray) {
    // compare the topics array of old as well as new user
    TotaluserArray = Promise.all(TotaluserArray.map(async userObj => {
      const defaultTopics = await this.getDefaultTopics(userObj['role']);
      userObj['topics'] = {...defaultTopics};
      return userObj;
    }));
    return TotaluserArray;
  }

  getDefaultTopics(role: string) {
    return this.getRolesInfoFromLocalDB(role).then(roleInfo => Promise.resolve(roleInfo['topics']))
    /* const questionIdx = this.procedure.findIndex(questionObj => {
      if (questionObj['role'].toLowerCase() === role.toLowerCase()) {
        return true;
        // tslint:disable-next-line: curly
      } else return false;
    });
    return this.procedure[questionIdx]['topics']; */
  }

  /**
   * Syncs role info. This function essentially updates the information regarding roles in the local database.
   * Role info such as roles, their topics, their questions etc will be updated everytime user is on the login page and is online.
   */
  async syncRoleInfo() {
    console.log('syncing role specific details from remote, printing config');
    // assuming we have the role object from server
    if (await this.saveRolesInLocalDB(this.procedure)) {
      console.log('roles saved successfully');
      const roles = await this.getRolesInfoFromLocalDB();
      console.log('roles from local db are ', roles);
      return Promise.resolve(true);
    } else {
      console.log('could not save roles, will try again later');
      return Promise.resolve(false);
    }
  }

  saveRolesInLocalDB(dataToSave) {
    return this.storage.set('roles_info', JSON.stringify(dataToSave))
    .then(ok => {
      return Promise.resolve(true);
    })
    .catch(notOK => {
      console.log('An error while saving the roles info in local storage', notOK);
      return Promise.resolve(false);
    });
  }

  /**
   * @description Gets roles info from local db. If roleType is provided, it returns only that role else complete details
   * @param [roleType]
   * @returns Object
   */
  getRolesInfoFromLocalDB(roleType?: string) {
    return new Promise((resolve, reject) => {
      this.storage.get('roles_info').then(rolesInfo => {
        if (rolesInfo) {
          const parsedRoles = JSON.parse(rolesInfo);
          if (roleType) {
            resolve(parsedRoles.find(roleObj => roleObj['role'].toLowerCase() === roleType.toLowerCase()));
          } else {
            resolve(parsedRoles);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Loads app local roles. This will store the default roles information in the local store
   */
  loadAppLocalRoles() {
    return this.saveRolesInLocalDB(this.procedure);
  }
}
