import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { VotesPage } from '../pages/votes/votes';
import { SynthesePage } from '../pages/synthese/synthese';
import { ModalPage } from '../pages/modal/modal';
import { RecherchePage } from '../pages/recherche/recherche';
import { HistoriquePage } from '../pages/historique/historique';
import { NavigationPage } from '../pages/navigation/navigation';
import { AuthentificationPage } from '../pages/authentification/authentification';

import { FlashCardComponent } from '../components/flash-card/flash-card';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { DragulaModule } from 'ng2-dragula';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b9f52b0c'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    SuggestionsPage,
    VotesPage,
    SynthesePage,
    ModalPage,
    RecherchePage,
    HistoriquePage,
    NavigationPage,
    AuthentificationPage,
    FlashCardComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicImageLoader.forRoot(),
    DragulaModule,
    HttpModule,
    SwingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccueilPage,
    SuggestionsPage,
    VotesPage,
    SynthesePage,
    ModalPage,
    RecherchePage,
    HistoriquePage,
    NavigationPage,
    AuthentificationPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
