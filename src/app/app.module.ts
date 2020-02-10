import { Network } from "@ionic-native/network/ngx";
import {Dialogs} from "@ionic-native/dialogs/ngx";
import {FileTransfer} from "@ionic-native/file-transfer/ngx";
import { SyncService } from "./services/sync/sync.service";
import { NgModule} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { File } from "@ionic-native/file/ngx";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { Media } from "@ionic-native/media/ngx";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: "digitalgreendb"
    })
  ],
  providers: [
    StatusBar,
    Network,
    Dialogs,
    SplashScreen,
    File,
    // tslint:disable-next-line: deprecation
    FileTransfer,
    SyncService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Media,
    File,
    MediaCapture
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
