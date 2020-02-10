import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UUID } from "angular2-uuid";
import { UserService } from "./../user.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  sessionList = [];
  constructor(private storage:Storage, private userService: UserService) {}

  getParsedData(data) {
    return JSON.parse(data);
  }
  async getSessionList() {
    if (!(this.sessionList.length)) {
      const loggedinuser = await this.userService.getLoggedInUser();
      const sessionList = await this.storage.get(
        loggedinuser["username"]
      );
      if (!!sessionList && !!sessionList.length) {
        this.sessionList = this.getParsedData(sessionList);
      }

    }
    return this.sessionList;

  }

  createUniqueId() {
    return UUID.UUID();
  }

  async getSessionById(id) {
    let session = await this.storage.get(id);
    session = this.getParsedData(session);
    return session;
  }

  async addNewSession(sessionData) {
    let sessionList = await this.getSessionList();
    if (!!sessionList && !!this.sessionList.length) {
      sessionList.unshift(sessionData);
    } else {
      sessionList.push(sessionData);
    }
    const updated = await this.setSessionList(sessionList);
    const uploadNewSession = await this.storage.set(
      sessionData['sessionid'],
      JSON.stringify(sessionData)
    );
    return (uploadNewSession && updated);
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
        break;
        // const updated = await this.setSessionList(sessionList);
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
    return (updateSpecificSessionStorage & updateAllSessionStorage);
  }

  clearSessionData() {
    this.sessionList = [];
  }

  // uploadTopicDataToCloud(sessionId, topicId) {
  //     const sessionData = this.getSessionById(sessionId)[0];
  //         let topicData:any = sessionData['topics'].filter((element)=>{
  //     return element.topic_name===topicId;
  //     });
  //      topicData= topicData[0];
  //      topicData['isUploaded'] = true;

  //       let topicDataUploadStatus: any = sessionData['topics'].filter((element)=>{
  //     return element.isUploaded===false;
  // });
  //       if (topicDataUploadStatus.length > 0) {
  //         sessionData['isUploaded'] = true;
  //     }
  // }
}
