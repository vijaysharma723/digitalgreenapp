// tslint:disable: deprecation
// tslint:disable: max-line-length
// tslint:disable: no-string-literal
// tslint:disable: no-debugger
import { Injectable } from '@angular/core';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { File } from '@ionic-native/file/ngx';
import { ChecknetworkService } from '../checknetwork/checknetwork.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  private APIEndpoint = 'http://13.234.2.81:3001/sessions/upload';
  private createSessionEndPoint = 'http://13.234.2.81:3001/sessions/create';
  private CheckStatusAPIEndpoint = 'http://13.234.2.81:3001/sessions/status/';
  private defaultBearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys';
  parentFolderDir = 'session';

  constructor(
    private readonly FileTransferProvider: FileTransfer,
    private readonly dialog: Dialogs,
    private readonly file: File,
    private readonly networkSrvc: ChecknetworkService,
    private readonly http: HttpClient,
    private readonly sessionSrvc: SessionService) { }

  /**
   * To send a session recording file (strictly in .wav format) to the session upload api. Note that this API will first look whether the session id is existing or not
   * If not, it will trigger the session create functionality and then send the file
   * @param filePath Path to the file meant to be uploaded (considering the root is externalData directory)
   * @param APIEndPoint (optional) The endpoint where you want to upload API
   * @param requestType (default POST) http method for your endpoint
   * @returns  Promise which always resolves and contains mandatory key ok: Boolean stating whether the request succeeded or failed
   */

  sendSessionFileUploadRequest(filePath, APIEndPoint?: string, requestType?: string) {
    console.log('file to upload is', filePath);
    // check if the user is online or not
    if (typeof this.networkSrvc.isOnlineStatic === 'boolean' && this.networkSrvc.isOnlineStatic) {
      console.log('device is online');
      // valiadate the session id from server
      const fileNameData = this.getFileDataFromName(filePath.split('session/')[1]);
      const username = fileNameData[0];
      const sessionID = fileNameData[1];
      const topicID = fileNameData[2].split('.wav')[0];
      const statusEP = this.CheckStatusAPIEndpoint + username;
      const headerOptions = {
        headers: new HttpHeaders(
          // tslint:disable-next-line: object-literal-key-quotes
          { 'Authorization': this.defaultBearer })
      };
      this.http.get(statusEP, headerOptions)
        .subscribe(response => {
          console.log('recieved http details', response);
          if (response['status'] && (response['status'].toString() === '200' || response['status'].toString() === '304')) {
            const selectedSession = [];
            response['data'].every(session => {
              if (session.sessionid === sessionID) {
                // found
                console.log('session exists');
                selectedSession.push(session);
                return false;
              }
              return true;
            });
            if (selectedSession.length > 0) {
              // it is an existing session, send the file
              this.sendForUpload(filePath, null, null, sessionID, topicID);
            } else {
              // create a new session
              // get session from local db, and create as is in the remote db
              this.sessionSrvc.getSessionById(sessionID).then(sessionObj => {
                const remoteSessionObj = {
                  username,
                  sessions: [
                    {
                      name: sessionObj.name,
                      created: sessionObj.created,
                      session_id: sessionID,
                      topics_limit: sessionObj.topics_limit,
                      isUploaded: false,
                      topics: []
                    }
                  ]
                };
                // hit the create api
                this.http.post(this.createSessionEndPoint, remoteSessionObj, headerOptions).subscribe(createRes => {
                  console.log('createRes', createRes);
                  this.sendForUpload(filePath, null, null, sessionID, topicID);
                });
              });
            }
          }
        });
    } else {
      console.log('detected as offline for now, aborting online sync');
      // null error means device is offline
      return Promise.resolve({ ok: false, error: null });
    }
  }

  sendForUpload(filePath, APIEndPoint?: string, requestType?: string, sessionID?: string, topicID?: any) {
    const externalPath = this.file.externalDataDirectory + filePath;
    console.log('complete path to upload is ', externalPath);
    return new Promise(async (uploadRes, uploadRej) => {
      if (!APIEndPoint) {
        APIEndPoint = this.APIEndpoint;
      }
      if (!requestType) {
        requestType = 'POST';
      }
      // get the file name
      const fileName = externalPath.substring(externalPath.lastIndexOf('/') + 1, externalPath.length);
      console.log('filename is ', fileName);

      const uploader = this.FileTransferProvider.create();

      const options = {
        mimeType: 'multipart/form-data',
        httpMethod: requestType,
        chunkedMode: false,
        fileKey: 'session_recordings',
        fileName,
        headers: {
          Authorization: this.defaultBearer,
        }
      };
      // set the status to 0 as we are now initiating the upload request
      await this.sessionSrvc.setSessionStatus({topic_status: 0, its: new Date().toISOString()}, sessionID, topicID);
      uploader.upload(externalPath, APIEndPoint, options)
        .then(async uploaded => {
          if (uploaded.responseCode.toString() === '200') {
            const response = JSON.parse(uploaded.response);
            this.dialog.alert(response.message);
            // update the topic status
            if (sessionID && topicID) {
              if (await this.sessionSrvc.setSessionStatus({topic_status: 1, its: new Date().toISOString()}, sessionID, topicID)) {
                console.log('status updated in session db for ', sessionID + ' ' + topicID + ' ' + 1);
              }
            }
            uploadRes({ ok: true, response });
          }
        })
        .catch(uploadErr => {
          // if errror, check the number of tries the file has already been hit
          // if it has crossed 2 retries, means the file is permanently failed
          // else increment the retires so that it can be reuploaded later on
          // NOTE : by this time the file status should be 0 (only initiated but not uploaded)
          this.dialog.alert(`Error uploading ${fileName}`);
          this.updateRetries(sessionID, topicID);
          console.log('Error while uploading', uploadErr);
          uploadRej({ ok: false, error: `Error uploading ${fileName}` });
        });
    });
  }

  async updateRetries(sessionID, topicID) {
    const sessions = await this.sessionSrvc.getSessionList();
    sessions.every((session, index) => {
      if (session.sessionid.toString() === sessionID.toString()) {
        const topics = session.topics;
        topics.every((topic, topicidx) => {
          if (topic.topic_id.toString() === topicID.toString()) {
            if (sessions[index].topics[topicidx].hasOwnProperty('topic_retries')) {
              if (sessions[index].topics[topicidx].topic_retries >= 2) {
                // this topic is now permanently failed
                console.log('file ' + sessionID + ' ' + topicID + ' is now permanently failed');
                sessions[index].topics[topicidx]['topic_status'] = 2;
              } else {
                // increment retries
                sessions[index].topics[topicidx].topic_retries = (parseInt(sessions[index].topics[topicidx].topic_retries, 10) + 1).toString();
              }
              return false;
            } else {
              // add the topic_retires entry too
              sessions[index].topics[topicidx]['topic_retries'] = 0;
            }
            return false;
          }
          return true;
        });
        return true;
      }
      return true;
    });
    // set the sessions back in the list
    this.sessionSrvc.setSessionList(sessions);
  }

  getFileDataFromName(filePath) {
    const fileParams = filePath.split('_');
    return fileParams;
  }

  checkTopicTSEligibility(topic, defaultDiff = 20): boolean {
    const topicUploadTS = topic['its'];
    if (topicUploadTS) {
      // check whether the its difference is >= defaultDiff mins
      const currentTS = new Date();
      const diffInTime = new Date(topicUploadTS).getTime() - currentTS.getTime();
      if (Math.abs(Math.round(diffInTime / 1000 / 60)) >= defaultDiff ) {
        console.log('file allowed to reupload', topic.topic_id);
        return true;
      } else {
        this.dialog.alert('less than 20 for ', topic.topic_id);
        return false;
      }
    } else {
      // there is no its, means it's the first time for upload
      // this.dialog.alert('allowing', topic.topic_id);
      return true;
    }
  }

  async syncUserSessions(ifOnline) {
    if (ifOnline) {
      console.log('initiating sync event');
      // get the file, and send its path to the upload/session api
      // read all the sessions which are not yet synced
      const unsyncedSessions = await this.sessionSrvc.getUnSyncedSessions();
      console.log('unsynced sessions found as ', unsyncedSessions);
      if (unsyncedSessions['ok'] && unsyncedSessions['sessions'].length > 0) {
        for (const unsyncedSessionObj of unsyncedSessions['sessions']) {
          // generate complete path for the file, send it to upload api
          const sessionTopics = unsyncedSessionObj['topics'];
          if (sessionTopics && Array.isArray(sessionTopics) && sessionTopics.length > 0) {
            for (const topic of sessionTopics) {
              // check if the last time this topic was updated X mins ago (default 20)
              if (topic.hasOwnProperty('file_url') && parseInt(topic.topic_status, 10) < 1) {

                if (this.checkTopicTSEligibility(topic)) {
                  // file has been recorded, time to upload it
                const filePath =  {
                  base: this.file.externalDataDirectory,
                  filePath: 'session/' + topic.file_url,
                };
                // check if it is present
                this.file.checkFile(filePath.base, filePath.filePath)
                .then(res => {
                  console.log(res);
                  if (res) {
                    // file is present, upload it
                    console.log('starting upload to ', filePath.filePath);
                    // this.sessionSrvc.setSessionStatus({topic_status: 0, its: new Date().toISOString()}, unsyncedSessionObj.sessionid, topic.topic_id)
                    this.sendSessionFileUploadRequest(filePath.filePath);
                  } else {
                    // file is not present, leave it as is
                  }
                }).catch(fileErr => {
                  if (fileErr.message === 'NOT_FOUND_ERR') {
                    console.log('file url is present but file is not present locally for ' + filePath.filePath);
                  }
                });
                } else {
                  console.log('topic ', topic.topic_id + ' was uploaded less than default time diff, will try it later');
                }
              } else {
                // it has not been recorded, yet
              }
            }
          }
        }
      } else {
        console.log('No unsynced sessions present');
      }
    }
  }
}
