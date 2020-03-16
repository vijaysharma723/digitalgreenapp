import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private readonly configEndpoint = 'assets/config/api_config.json';

  constructor(
    private readonly storage: Storage,
    private readonly http: HttpClient) { }

  get getConfig() {
    return this.storage.get('endpoints')
    .then(res => {
      console.log('endpoints in storage are ', res);
      if (res) {
        return Promise.resolve(JSON.parse(res));
      } else {
        return this.getAndStoreConfig();
      }
    });
  }

  private getAndStoreConfig() {
    return this.http.get(this.configEndpoint).toPromise()
    .then(jsonRes => {
      console.log('recieved api config details as ', jsonRes);
      return this.storage.set('endpoints', JSON.stringify(jsonRes))
      .then(ok => {
        return Promise.resolve(jsonRes);
      }).catch(saveErr => {
        console.error('An error occured while saving jsonRes of config to local storage', saveErr);
        return Promise.reject(null);
      });
    })
    .catch(apiEndpoinErr => {
      console.error('An error occured while reading api config file', apiEndpoinErr);
      return Promise.reject(null);
    });
  }
}
