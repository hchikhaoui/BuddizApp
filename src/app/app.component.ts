﻿import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { AccueilPage } from '../pages/accueil/accueil';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { VotesPage } from '../pages/votes/votes';
import { SynthesePage } from '../pages/synthese/synthese';
import { NavigationPage } from '../pages/navigation/navigation';
import { AuthentificationPage } from '../pages/authentification/authentification';
import { RecherchePage } from '../pages/recherche/recherche';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = VotesPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }
  initializeApp() {
      this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
      });
  }
}
