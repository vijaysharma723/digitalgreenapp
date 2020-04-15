import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {

  private sampleSet = {status: 200, data: [
    {
        "name": "Health_140301",
        "session_id": "d6eef954-790a-8410-e639-aa1562706ac1",
        "created": "2020-04-14T08:30:31.305Z",
        "isUploaded": false,
        "username": "vijay",
        "topics": []
    },
    {
        "name": "Agriculture_1342296",
        "session_id": "66854bb1-e5ea-510c-51f6-46fff806d4c9",
        "created": "2020-04-14T08:12:11.297Z",
        "isUploaded": false,
        "username": "vijay",
        "topics": [
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            }
        ]
    },
    {
        "name": "Agriculture_1215493",
        "session_id": "542f83f5-106c-81f5-b8f1-ad06f3e8769d",
        "created": "2020-04-14T06:45:05.494Z",
        "isUploaded": false,
        "username": "vijay",
        "topics": [
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            },
            {
                "name": "3",
                "isUploaded": true,
                "topic_id": "3"
            }
        ]
    },
    {
        "name": "Health_1113642",
        "session_id": "e556bdd8-402c-4622-34b6-9d7a5632421c",
        "created": "2020-04-14T05:43:10.643Z",
        "isUploaded": false,
        "username": "vijay",
        "topics": [
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            },
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "4",
                "isUploaded": true,
                "topic_id": "4"
            }
        ]
    },
    {
        "name": "Agriculture_118686",
        "session_id": "6142ca98-28e6-69ae-a89c-d0f80a825dc5",
        "created": "2020-04-14T05:38:57.686Z",
        "isUploaded": true,
        "username": "vijay",
        "topics": [
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            },
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "3",
                "isUploaded": true,
                "topic_id": "3"
            },
            {
                "name": "4",
                "isUploaded": true,
                "topic_id": "4"
            }
        ]
    },
    {
        "name": "Health_111287",
        "session_id": "c84f78ae-7ca1-3599-02d3-99b16715b87d",
        "created": "2020-04-14T05:31:24.290Z",
        "isUploaded": true,
        "username": "vijay",
        "topics": [
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "3",
                "isUploaded": true,
                "topic_id": "3"
            },
            {
                "name": "4",
                "isUploaded": true,
                "topic_id": "4"
            },
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            }
        ]
    },
    {
        "name": "Health_946569",
        "session_id": "1231bc9e-f1bc-707c-7019-fdba39507a28",
        "created": "2020-04-14T04:16:40.569Z",
        "isUploaded": false,
        "username": "vijay",
        "topics": [
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            }
        ]
    },
    {
        "name": "Agriculture_944338",
        "session_id": "f9502d9f-1d3b-9fac-992f-94720a653954",
        "created": "2020-04-14T04:14:57.340Z",
        "isUploaded": true,
        "username": "vijay",
        "topics": [
            {
                "name": "1",
                "isUploaded": true,
                "topic_id": "1"
            },
            {
                "name": "2",
                "isUploaded": true,
                "topic_id": "2"
            },
            {
                "name": "3",
                "isUploaded": true,
                "topic_id": "3"
            },
            {
                "name": "4",
                "isUploaded": true,
                "topic_id": "4"
            }
        ]
    }
]};
  constructor(public http: HttpClient) { }
  getStatus(username): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA5ODg5Njd9.H6xfNNNe2kUVBF-FBG8ChB1b_j2tMBnmJQOsafPxwNo'
      })
    };
    // http://52.221.207.221:3001/sessions/status/
    // return this.http.get('http://socion-pda-dashboard.stackroute.com:3015/sessions/status/' + username, httpOptions);
    return this.http.get('https://b6d31f52.ngrok.io/sessions/status/' + username, httpOptions);
  }
}
