// tslint:disable: prefer-for-of
// tslint:disable: no-string-literal
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UUID } from "angular2-uuid";
import { UserService } from "./../user.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  sessionList = [];
  STATUS = {
    REQUEST_INITIATED: 0,
    REQUEST_FAILED_PERMANENTLY: 2,
    TOPIC_UPLOADED: 1,
    REQUEST_SYNCED: 3,
    RETIRES_LIMIT: 2,
  };
  constructor(private storage: Storage, private userService: UserService) {}

  getParsedData(data) {
    return JSON.parse(data);
  }
  async getSessionList() {
    const loggedinuser = await this.userService.getLoggedInUser();
    const sessionList = await this.storage.get(loggedinuser["username"]);
    if (!!sessionList && !!sessionList.length) {
      this.sessionList = this.getParsedData(sessionList);
    }
    return this.sessionList;
  }

  createUniqueId() {
    return UUID.UUID();
  }

  async getSessionById(id) {
    const sessionList = await this.getSessionList();
    for (let i = 0; i < sessionList.length; i++) {
      if (sessionList[i]["sessionid"] === id) {
        return sessionList[i];
      }
    }
  }

  async addNewSession(sessionData) {
    const sessionList = await this.getSessionList();
    if (!!sessionList && !!this.sessionList.length) {
      sessionList.unshift(sessionData);
    } else {
      sessionList.push(sessionData);
    }
    const updated = await this.setSessionList(sessionList);
    const uploadNewSession = await this.storage.set(
      sessionData["sessionid"],
      JSON.stringify(sessionData)
    );
    return uploadNewSession && updated;
  }

  async setSessionList(sessionList) {
    const loggedinuser = await this.userService.getLoggedInUser();
    const status = await this.storage.set(
      loggedinuser["username"],
      JSON.stringify(sessionList)
    );

    this.sessionList = sessionList;
    return status;
  }

  async updateSessionTopicData(sessionId, topicId, filePath) {
    const session = await this.getSessionById(sessionId);
    for (let j = 0; j < session["topics"].length; j++) {
      const topic = session["topics"][j];
      if (topic["topic_id"] === topicId) {
        session["topics"][j]["file_url"] = filePath;
        session['topics'][j]['isUploaded'] = false;
        session['topics'][j]['topic_status'] = -1;
        break;
      }
    }
    const updateSpecificSessionStorage = await this.storage.set(
      sessionId,
      JSON.stringify(session)
    );
    const sessionList = await this.getSessionList();
    for (let i = 0; i < sessionList.length; i++) {
      const sessionEach = sessionList[i];
      if (sessionEach["sessionid"] === sessionId) {
        sessionList[i] = session;
        break;
      }
    }
    const updateAllSessionStorage = await this.setSessionList(sessionList);
    return updateSpecificSessionStorage & updateAllSessionStorage;
  }

  clearSessionData() {
    this.sessionList = [];
  }

  /**
   * Gets un synced sessions
   */
  async getUnSyncedSessions() {
    const userSessions = await this.getSessionList();
    let unsyncedSessions;
    console.log('data in session service ', userSessions);
    if (Array.isArray(userSessions) && userSessions.length > 0) {
      // get all the unsynced sessions
      unsyncedSessions = userSessions.filter(session => {
        return session.isUploaded === false;
      });
    } else {
      console.log('sending empty sessions');
      unsyncedSessions = [];
    }
    return new Promise((resolve, reject) => {
      console.log('sending sessions as ', unsyncedSessions);
      resolve({ok: true, sessions: unsyncedSessions});
    });
  }

  /**
   * Sets session status. To upate the status of the session / topic
   * @param stausVal
   * @param sessionID
   * @param [topicID]
   */
  async setSessionStatus(statusObj: any, sessionID: string, topicID?: string) {
    console.log('status obj to update is ', statusObj);
    if (!sessionID || statusObj == null || statusObj === undefined) {
      return false;
    } else {
      // get the session, update its session status / topic status, set it back
      const sessions = await this.getSessionList();
      const sessionidx = sessions.findIndex(session => session.sessionid === sessionID);
      if (topicID !== undefined && topicID !== null) {
        // update topic status
        sessions[sessionidx]['topics'].forEach(topic => {
          if (topic['topic_id'].toString() === topicID.toString()) {
            Object.entries(statusObj).forEach(entryArray => {
              topic[entryArray[0]] = entryArray[1];
            });
          }
        });
      } else {
        // update session status
        console.log('sessions updated as ', sessions);
        Object.entries(statusObj).forEach(entryArray => {
          sessions[sessionidx][entryArray[0]] = entryArray[1];
        });
      }
      // set the session object back
      this.setSessionList(sessions);
      return true;
    }
  }

  generateSession(sessionData, defaultQuestions) {
    const session = {
      name: sessionData['name'],
      sessionid: sessionData['session_id'],
      created: sessionData['created'],
      isUploaded: sessionData['isUploaded'],
      topics: this.syncRemoteTopics(sessionData.topics, defaultQuestions),
      topics_limit: sessionData.topics.length,
    };
    console.log('these are the questions');
    console.log('generated session object is ', session.topics);
    return session;
  }

  /**
   * Syncs remote topics. This function will compare which question or topic is to be updated by looping over 
   * the topics present inside serverTopicData Array
   * @param serverTopicsData
   * @param defaultQuestions
   * @returns Modified Topics Array
   */
  syncRemoteTopics(serverTopicsData, defaultQuestions) {
    // update the question using server data
    defaultQuestions.forEach((defaultQ, index) => {
      // find and update

      // tslint:disable-next-line: max-line-length
      const matchedServerIdx = serverTopicsData.findIndex(serverTopic => defaultQ['topic_id'].toString() === serverTopic['topic_id'].toString());
      if (matchedServerIdx > -1) {
          defaultQuestions[index]['isUploaded'] = serverTopicsData[matchedServerIdx]['isUploaded'];
          defaultQuestions[index]['topic_status'] = '3';
          defaultQuestions[index]['file_url'] = 'already synced with server';
      }
      /* serverTopicsData.every((serverTopic) => {
        console.log('inside if', defaultQ['topic_id'].toString() === serverTopic['topic_id'].toString());
        if(defaultQ['topic_id'].toString() === serverTopic['topic_id'].toString()) {
          defaultQuestions[index]['isUploaded'] = serverTopic['isUploaded'];
          defaultQuestions[index]['topic_status'] = '3';
          defaultQuestions[index]['file_url'] = 'already synced with server';
          console.log('if ended', defaultQ['topic_id'].toString());
          return false;
        }
        console.log('inside else block', defaultQ);
        defaultQuestions[index]['isUploaded'] = false;
        return true;


}) */

    });
    return defaultQuestions;
  }
}
