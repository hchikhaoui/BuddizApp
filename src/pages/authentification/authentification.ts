import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, App } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { SynthesePage } from '../synthese/synthese';

import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { ViewController } from 'ionic-angular';

import {Sortie} from '../../models/sortie'
import {Client} from '../../models/client'


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

  public client: Client = {
    id: null,
    nom: '',
    mail: '',
    passe: '',
    image: '',
    sorties: []
  }

  public name:string = '';
  public email:string = '';
  public password:string = '';
  public image:string = ''

  public token: string = ''

//public logged: boolean = false;
public showLogin:boolean = true;

public constructor(
//    public viewCtrl: ViewController,
    public auth:Auth,
    public user: User,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public menuCtrl: MenuController,
    private app: App,
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


      let details: UserDetails = {'email':this.email, 'password':this.password};

      this.auth.login('basic', details, {'remember': false}).then((res: any) => {
        this.token = res.token

        loader.dismissAll();
          this.app.getActiveNav().push(AccueilPage)
      //  this.logged = true;
      }
      , (err) => {
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

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name, 'image': this.image};

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        loader.dismissAll();
        this.showLogin = true
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

  doLogout(){
    this.auth.logout()
    this.app.getActiveNav().push(AccueilPage)
   // this.logged = false
  }

  status(){
    console.log(this.user.details.name)
    console.log(this.auth.isAuthenticated())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
  }

}
