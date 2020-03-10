import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questions = [
    {
      topics: ['कृषि', 'स्वास्थ्य'],
      role: 'vrp',
      questions : [
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
    },
    {
      topics: ['जल संचयन', 'फसल की खेती', 'कृषि नीतियां'],
      role: 'mrp',
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
    },
    {
      topics: ['कीटनाशक नियंत्रण', 'कृषि नीतियां', 'फसल कटाई', 'दूध उत्पादन'],
      role: 'block_officer',
      questions: [{
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
      }],
    }
  ];

  constructor() { }

  getDefaultQuestions(role) {
    const questionIdx = this.questions.findIndex(questionObj => questionObj['role'].toLowerCase() === role.toLowerCase());
    return this.questions[questionIdx]['questions'];
  }

  updateQuestions(userQuestionsArray, role) {
    const defaultQuestions = this.getDefaultQuestions(role);

    const mergedQuestionsArray = userQuestionsArray.map(userQuestionObj => {
      // tslint:disable-next-line: max-line-length
      const selectedDefaultQObjIdx = defaultQuestions.findIndex(defaultQuestionObj => defaultQuestionObj['topic_id'].toLowerCase() === userQuestionObj['topic_id'].toLowerCase());
      if (selectedDefaultQObjIdx > -1) {
        // updating an old topic
        if (defaultQuestions[selectedDefaultQObjIdx]['topic_name'] !== userQuestionObj['topic_name']) {
          // update the topic name
          userQuestionObj['topic_name'] = defaultQuestions[selectedDefaultQObjIdx]['topic_name'];
        }
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

  syncTopics(TotaluserArray) {

    // compare the topics array of old as well as new user
    TotaluserArray = TotaluserArray['users'].map(userObj => {
      const defaultTopics = this.getDefaultTopics(userObj['role']);
      if (userObj.hasOwnProperty('topics') && userObj['topics']) {
        defaultTopics.forEach((defaultTopic, defaultIdx) => {
          if (!userObj['topics'].includes(defaultTopic)) {
            userObj['topics'].splice(defaultIdx, 0, defaultTopic);
          }
          // run one more iteration on user topics, to see which topics are present in local and not present in remote
          // we need to remove those topics from local
          userObj['topics'] = userObj['topics'].filter(userTopic => defaultTopics.includes(userTopic));
        });
      } else {
        // simply add default topics
        userObj['topics'] = [...defaultTopics];
      }
      return userObj;
    });
    return {users: TotaluserArray};
  }

  getDefaultTopics(role: string) {
    const questionIdx = this.questions.findIndex(questionObj => {
      if (questionObj['role'].toLowerCase() === role.toLowerCase()) {
        return true;
      // tslint:disable-next-line: curly
      } else return false;
    });
    return this.questions[questionIdx]['topics'];
  }
}
