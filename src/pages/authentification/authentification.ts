import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, App, AlertController, LoadingController /*NavController*/ } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AccueilPage } from '../accueil/accueil';

import {Utilisateur} from '../../models/utilisateur'
// DT-108f9f8b37463c8f54a87a8930f3695a7e128301 user@mail.com      597a491802dbb8698d2cb647
// DT-fc42b8d2f3c4ff16b8918deb5935c72a8b0387f5 another@mail.com   597b30935b651e567869d16f

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

  public utilisateur: Utilisateur = {
    _id: '',
    userProfile: {userName: '', userMail: ''},
    deviceTokens: [],
    searches: [],

    accessControl: {
      appRoles: [],
      appGroups: [],
      users: [],
      groups: [],
      permissions: []
    }
  };

  public token: string = '';
  public tokenParDefaut: string = 'DT-1000000000000000000000000000000000000002';
  logged: boolean = false
  showLogin: boolean = true

public constructor(
/*    public navCtrl: NavController, */
    private http: Http,
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public menuCtrl: MenuController,
    ) {}


  headerGET(){
  let headers = new Headers({ 'deviceToken': this.token });
  headers.append('Accept', 'application/json')
  return new RequestOptions({ headers: headers });
  }

  doLogin(){

      let loader = this.loadingCtrl.create({
        content: "En cours de login..."
      });
      loader.present();

      this.http.get('https://appfront.dev.buddiz.io:443/user/token/device', this.headerGET()).subscribe((response: Response) =>
      {
        // console.log(response.json());
        this.utilisateur = response.json()
        localStorage.setItem(this.utilisateur._id, JSON.stringify(this.utilisateur))

        loader.dismissAll()
        this.logged = true
        this.app.getActiveNav().push(AccueilPage, {user_id: this.utilisateur._id})
      },
        (error: any) =>
        {
          loader.dismissAll()
          console.log(error.message)
        })
  }


  headerPOST(){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Accept', 'application/json')
    return new RequestOptions({ headers: headers });
  }
  doRegister() {

    if(this.utilisateur.userProfile.userName === '' || this.utilisateur.userProfile.userMail === '') {
        let alert = this.alertCtrl.create({
          title:'Erreur',
          subTitle:'Tous les champs sont requis',
          buttons:['OK']
        });
        alert.present();
        return;
      }


    let loader = this.loadingCtrl.create({
      content: "En cours de register..."
    });
    loader.present();

     this.http.post('https://appfront.dev.buddiz.io:443/users', this.utilisateur, this.headerPOST()).subscribe((response: Response) =>
       {
         console.log(response.json());
         this.utilisateur = response.json()
         loader.dismissAll()
         this.showLogin = !this.showLogin
         },
       (error: any) =>
       {
         loader.dismissAll()
         console.log(error.message)
       })
  }

  doLogout(){
    localStorage.clear()
    this.token = ''
    this.logged = false
    this.app.getActiveNav().push(AccueilPage)
    // this.navCtrl.setRoot(AccueilPage);
    // this.nav.setRoot(AccueilPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
  }

}
