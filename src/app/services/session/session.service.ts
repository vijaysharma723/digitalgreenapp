import { Injectable } from '@angular/core';
import {StorageService} from './../storage/storage.service';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private storageService: StorageService) { 
  }

  async getSessionList() {
    const loggedinuser = await this.storageService.getObject('loggedinuser');
    const sessionList = await this.storageService.getObject(loggedinuser['username']);
    if(!!sessionList)
      return sessionList;
    else
      return null;
}

  createUniqueId(){
      return UUID.UUID();
  }

  async getSessionById(id) {
    const sessionList = await this.getSessionList();
    for (let i=0; i< sessionList.length; i++) {
      const session = sessionList[i];
      if(session['sessionid'] === id)
      return session;
    }
    return null;
  }

  async addNewSession(sessionData) {
    let sessionList = await this.getSessionList();
    if(!!sessionList) {
      sessionList.unshift(sessionData);
    }
    else {
      sessionList = [];
      sessionList.push(sessionData);
    }
    return await this.setSessionList(sessionList);
  }

    async setSessionList(sessionList) {
    const loggedinuser = await this.storageService.getObject('loggedinuser');
    const status = await this.storageService.setObject(loggedinuser['username'],sessionList);
    return status;
  }


  async updateSessionTopicData(sessionId, topicId, filePath) {
    const sessionList = await this.getSessionList();
    for (let i=0; i< sessionList.length; i++) {
      const session = sessionList[i];
      if(session['sessionid'] === sessionId) {
        for (let j=0; j< session['topics'].length; j++) {
          const topic = session['topics'][j];
          if(session['topic_id'] === topicId) {
            session['topic_id']['file_url'] = filePath;
            return await this.setSessionList(sessionList);
          }
        }
      }
    }
    return false;
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
