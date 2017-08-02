import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List, AlertController, ModalController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { CriteriaPage } from '../../modals/fixer_criteres';
import { OptionsPage } from '../../modals/sortie_options';
import { HistoriquePage } from '../historique/historique';

import {Utilisateur} from '../../models/utilisateur'

import {Sortie} from '../../models/sortie'


@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})

export class AccueilPage {

  public instant = new Date().toISOString()
  public historiques: Array<Sortie> = []

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
  }

  constructor(public auth:Auth, public user: User, public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private http: Http) {
      console.log(JSON.parse(localStorage.getItem(navParams.get('user_id'))))
      if(localStorage.getItem(navParams.get('user_id'))){
        this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
      }
      this.http.get('https://appfront.dev.buddiz.io:443/user/token/device', this.FixerHeaderGET()).subscribe((response: Response) => {console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+response.json())}, (error: any) => console.log('error data')) 
      this.HistoriqueDesRecherches()
  }


  CriteriaModal() {
    let modal = this.modalCtrl.create(CriteriaPage, {user_id: this.utilisateur._id});
    modal.present();
  }


  OptionsModal(option: string){
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques, user_id: this.utilisateur._id});
    modal.present();
  }

  Accueil(event){
    this.navCtrl.setRoot(AccueilPage,{user_id: this.utilisateur._id})
  }

  private FixerHeaderGET() {
            let headers = new Headers({ 'deviceToken': 'DT-1000000000000000000000000000000000000002' });
            headers.append('Accept', 'application/json')
            return new RequestOptions({ headers: headers });
  }

  HistoriqueDesRecherches(){
      let item: Sortie
      if(this.utilisateur){
        for(let s in this.utilisateur.searches){
        this.http.get('https://appfront.dev.buddiz.io:443/search/' + this.utilisateur.searches[s] , this.FixerHeaderGET()).subscribe((response: Response) => {console.log(response.json()); item = response.json()}, (error: any) => console.log('error data'));
        this.historiques.push(item)
      }
      }
  }

  historique(event, hist) {
    this.navCtrl.setRoot(HistoriquePage,{hist: hist, user_id: this.utilisateur._id})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddizPage');
  }

}


    // _id: hist._id,
      // accessControl: hist.accessControl,
      // searchParameters: hist.searchParameters,
      // elementSelected: hist.elementSelected,
      // elementExcluded: hist.elementExcluded,
      // elementLiked: hist.elementLiked,
      // elementDisliked: hist.elementDisliked,
      // created_At: hist.created_At