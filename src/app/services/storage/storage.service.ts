import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
export interface IUser{
  username: string;
  password: string;
  role: string;
  topics: Array<string>;
  questions: Array<string>;
  sessionToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) {
    console.log('Your storage provider is working here !');
   }

   // set a key/value object
setObject(key: string, object: Object) :Promise<any> {
  try {
    return this.storage.set(key, JSON.stringify(object)).then((result) => {
      console.log('set Object in storage: ' + result);
      return Promise.resolve(true);
    });
  } catch (reason) {
    console.log(reason);
    return Promise.resolve(false);
  }
}

// get a key/value object
getObject(key: string) :Promise<any> {
  try {
    return this.storage.get(key).then((result) => {
        if (result != null) {
      return Promise.resolve(JSON.parse(result));
    } else {
      return Promise.resolve(result);
    }
    });
  } catch (reason) {
    console.log(reason);
    return null;
  }
}


set(key: string, value: any) :Promise<any> {
  try {
   return this.storage.set(key, value).then((result)=> {
    // console.log('set string in storage: ' + result);
    return Promise.resolve(true);
   });
  } catch (reason) {
    console.log(reason);
    return Promise.resolve(false);
  }
}


get(key: string) :Promise<any> {
  try {
    return this.storage.get(key).then((result)=> {
      if (result != null) {
        return Promise.resolve(result);
      }
      //  console.log('storageGET: ' + key + ': ' + result);
      return Promise.resolve(null);
    });
    } catch (reason) {
      console.log(reason);
      return Promise.resolve(null);
  }
}




remove(key: string) {
this.storage.remove(key);
}

clearStorage() {
  this.storage.clear();
}


}
