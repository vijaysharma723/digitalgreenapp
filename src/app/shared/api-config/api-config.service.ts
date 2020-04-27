import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private readonly CONFIG = {
    HOST: 'https://d06ddeeb.ngrok.io/',
    AUTH: {
      // tslint:disable-next-line: max-line-length
      DEFAULT: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA4ODI1Nzl9.dxrWrjX3jaUe4t33Y9H0oLdSxenSaJA-EYaCNHIk8Ys'
    },
    API: {
      AUTH: {
        VALIDATE_TOKEN: 'auth/validate-token',
      },
      SESSIONS: {
        STATUS: 'sessions/status',
        READ: 'sessions/read',
        CREATE: 'sessions/create',
        UPLOAD: 'sessions/upload',
      },
      USER: {
        LOGIN: 'user/login',
        LIST: 'user/list',
        REGISTER: 'user/register'
      },
      WEBHOOK: {
        DIGITAL_GREEN: {
          GOOGLE_CLOUD: 'webhook/digital-green/google-cloud'
        }
      },
      DASHBOARD: {
        GET_REPORT: 'dashboard/get-report'
      },
      ROLES: {
        USERS: 'roles/users'
      }
    },
    CONSTANTS: {
      SESSION: {
        STATUS: {
          REQUEST_INITIATED: 0,
          REQUEST_FAILED_PERMANENTLY: 2,
          TOPIC_UPLOADED: 1,
          REQUEST_SYNCED: 3,
          RETIRES_LIMIT: 2,
        },
        DEFAULT_TIME_DIFF_FOR_ELIGIBILITY: 5,
        PARENT_FOLDER_NAME: 'session',
        UPLOAD_FILE_KEY: 'session_recordings',
        UPLOAD_MIME_TYPE: 'multipart/form-data',
        UPLOAD_CHUNKED_MODE: false,
        UPLOAD_REQUEST_TYPE: 'POST',
      }
    }
  };

  constructor(
    ) { }

  get getConfig() {
    return this.CONFIG;
  }

  get apiEndPoints() {
    return this.CONFIG.API;
  }

  get constants() {
    return this.CONFIG.CONSTANTS;
  }
  get authentication() {
    return this.CONFIG.AUTH;
  }
}
