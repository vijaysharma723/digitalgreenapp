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
  getUnSyncedSessions() {
    return new Promise(async (resolve, reject) => {
      const userSessions = await this.getSessionList();
      if (Array.isArray(userSessions) && userSessions.length > 0) {
        // get all the unsynced sessions
        const unsyncedSessions = userSessions.filter(session => {
          return session.isUploaded === false;
        });
        resolve({ok: true, sessions: unsyncedSessions});
      } else {
        resolve({ok: true, sessions: []});
      }
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
    debugger;
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
}
