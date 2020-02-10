// tslint:disable: deprecation
// tslint:disable: max-line-length
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

  private APIEndpoint = 'https://9043818a.ngrok.io/sessions/upload';
  private createSessionEndPoint = 'https://9043818a.ngrok.io/sessions/create';
  private CheckStatusAPIEndpoint = 'https://9043818a.ngrok.io/sessions/status/';
  private defaultBearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys';

  constructor(
    private readonly FileTransferProvider: FileTransfer,
    private readonly dialog: Dialogs,
    private readonly file: File,
    private readonly networkSrvc: ChecknetworkService,
    private readonly http: HttpClient,
    private readonly sessionSrvc: SessionService) { }

  // initupload which will take filename
  // check status for session id
  // create session
  // get the session data and pass to the upload function
  // call





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
            let selectedSession = [];
            response['data'].every(session => {
              if (session.session_id === sessionID) {
                // found
                console.log('session exists');
                selectedSession = session;
                return false;
              }
              return true;
            });
            if (selectedSession.length > 0) {
              // it is an existing session, send the file
              this.sendForUpload(filePath);
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
                      isUploaded: false,
                      topics: []
                    }
                  ]
                };
                // hit the create api
                this.http.post(this.createSessionEndPoint, remoteSessionObj, headerOptions).subscribe(createRes => {
                  console.log('createRes', createRes);
                  this.sendForUpload(filePath);
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

  sendForUpload(filePath, APIEndPoint?: string, requestType?: string) {
    const externalPath = this.file.externalDataDirectory + filePath;
    console.log('complete path to upload is ', externalPath);
    return new Promise((uploadRes, uploadRej) => {
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
      debugger;
      uploader.upload(externalPath, APIEndPoint, options)
        .then(uploaded => {
          if (uploaded.responseCode.toString() === '200') {
            const response = JSON.parse(uploaded.response);
            this.dialog.alert(response.message);
            uploadRes({ ok: true, response });
          }
        })
        .catch(uploadErr => {
          this.dialog.alert(`Error uploading ${fileName}`);
          console.log('Error while uploading', uploadErr);
          uploadRej({ ok: false, error: `Error uploading ${fileName}` });
        });
    });
  }

  getFileDataFromName(filePath) {
    const fileParams = filePath.split('_');
    return fileParams;
  }
}
