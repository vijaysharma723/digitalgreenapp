// tslint:disable: deprecation
// tslint:disable: max-line-length
import { Injectable } from '@angular/core';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private readonly FileTransferProvider: FileTransfer, private readonly dialog: Dialogs) { }

  /**
   * To send a session recording file (strictly in .wav format) to the session upload api
   * @param filePath Path to the file meant to be uploaded
   * @param APIEndPoint (optional) The endpoint where you want to upload API
   * @param requestType (default POST) http method for your endpoint
   * @returns  Promise which always resolves and contains mandatory key ok: Boolean stating whether the request succeeded or failed
   */
  sendSessionFileUploadRequest(filePath, APIEndPoint?: string, requestType?: string) {
    return new Promise((uploadRes, uploadRej) => {
      if (!APIEndPoint) {
        APIEndPoint = 'https://9043818a.ngrok.io/sessions/upload';
      }
      if (!requestType) {
        requestType = 'POST';
      }
      // get the file name
      const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.wav')) + '.wav';
      console.log('filename is ', fileName);

      const uploader = this.FileTransferProvider.create();

      const options = {
        mimeType: 'multipart/form-data',
        httpMethod: requestType,
        chunkedMode: false,
        fileKey: 'session_recordings',
        fileName,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys',
        }
      };
      uploader.upload(filePath, APIEndPoint, options)
        .then(uploaded => {
          if (uploaded.responseCode.toString() === '200') {
            const response = JSON.parse(uploaded.response);
            this.dialog.alert(response.message);
            uploadRes({ok: true, response});
          }
        })
        .catch(uploadErr => {
          this.dialog.alert(`Error uploading ${fileName}`);
          console.log('Error while uploading', uploadErr);
          uploadRej({ok: false, error: `Error uploading ${fileName}`});
        });
    });
  }
}
