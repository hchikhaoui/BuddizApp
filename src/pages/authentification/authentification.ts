﻿import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { SynthesePage } from '../synthese/synthese';

import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

/**
 * Generated class for the AuthentificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage {


@ViewChild(Nav) nav: Nav;
rootPage = AccueilPage;

showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';
  constructor(
    public auth:Auth,
    public user: User,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public menuCtrl: MenuController,
    ) {
  }

  doLogin() {
    if(this.showLogin) {
      console.log('process login');

      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Erreur', 
          subTitle:'Tous les champs sont requis',
          buttons:['OK']
        });
        alert.present();
        return;
      }     

      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();
      
      this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
        console.log('ok i guess?');
        loader.dismissAll();
        this.nav.setRoot(AccueilPage);        
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email  n\'est pas valide.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Mot de passe requis.<br/>';

        let alert = this.alertCtrl.create({
          title:'Erreur', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if(!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
      if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Erreur', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
      console.log(details);
      
      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.nav.setRoot(AccueilPage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email requis.<br/>';
          if(e === 'required_password') errors += 'Mot de passe requis.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Votre Email n\'est pas valide.';
        }
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
     
    } else {
      this.showLogin = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
  }

}
