import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './pages/task/task.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDOLcWAlWO5_D8ZW-SG8wBf7iDNwupLmF0",
  authDomain: "sermalucapp.firebaseapp.com",
  projectId: "sermalucapp",
  databaseURL: "https://sermalucapp-default-rtdb.firebaseio.com",
  storageBucket: "sermalucapp.appspot.com",
  messagingSenderId: "238218060421",
  appId: "1:238218060421:web:85f40db16c9b51b1d4bfec",
  measurementId: "G-NZG1E61D4Q"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TaskModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
