import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChecknetworkService {
  public isOnline = new BehaviorSubject<any>('');
  public isOnlineStatic = null;
  constructor(public network: Network) {
    if (window.navigator.onLine) {
      this.isOnlineStatic = true;
      this.isOnline.next('Connected');
    } else if (!window.navigator.onLine) {
      this.isOnlineStatic = false;
      this.isOnline.next('Disonnected');
    }
    this.networkStatus();
  }
  networkStatus() {
    this.network.onDisconnect().subscribe(() => {
      this.isOnlineStatic = false;

      this.isOnline.next('Disconnected');
    });
    this.network.onConnect().subscribe(() => {
      this.isOnlineStatic = true;

      this.isOnline.next('Connected');
    });
  }
}
