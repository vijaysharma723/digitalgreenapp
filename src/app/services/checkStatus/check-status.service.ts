import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {
  constructor(public http: HttpClient) { }
  getStatus(username): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpc2hhYmhrYWxyYTk2IiwiZW1haWwiOiJyaXNoYWJoa2FscmE5NkBnbWFpbC5jb20iLCJpYXQiOjE1ODA5ODg5Njd9.H6xfNNNe2kUVBF-FBG8ChB1b_j2tMBnmJQOsafPxwNo'
      })
    };
    // http://52.221.207.221:3001/sessions/status/
    // return this.http.get('http://52.221.207.221:3001/sessions/status/' + username, httpOptions);
    return this.http.get('https://4baf2a65.ngrok.io/sessions/status/' + username, httpOptions);
  }
}
