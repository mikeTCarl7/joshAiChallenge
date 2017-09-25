import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  config = {
    apiKey: 'AIzaSyA0slDt0sm8nQUvA1pyTU_7HbQ63QS_nQQ',
    authDomain: 'joshai-fcb5c.firebaseapp.com',
    databaseURL: 'https://joshai-fcb5c.firebaseio.com',
    projectId: 'joshai-fcb5c',
    storageBucket: '',
    messagingSenderId: '541669305645'
  };

  ngOnInit() {

    firebase.initializeApp(this.config);

  }
}
