import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {AccueilPage} from '../accueil/accueil'

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
import {Elementt} from '../../models/elementt'
import {Utilisateur} from '../../models/utilisateur'
/**
 * Generated class for the historiquePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {

public element: Elementt
public sortie:Sortie = {
  accessControl:{
    userPermissionsOnApp: [],
    userPermissionsOnObject: [],
    users: ''
  },
  _id: '',
  searchParameters:{
    useCase: '',
    useCaseParams: [], 
      isOpen: '',
      name: '',
      timeStamp: null
    },
      elementSelected: [],
      elementExcluded: [],
      elementLiked: [],
      elementDisliked: [],
      created_At: null
}

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

  constructor(public app: App, public auth:Auth, public user: User, public navCtrl: NavController, public navParams: NavParams) {
    this.sortie = navParams.get('hist');
    if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
  }

  AfficherDetails(elmt: Elementt){
    this.element = elmt
  }

  Accueil(ev){
    this.navCtrl.setRoot(AccueilPage, {user_id: this.utilisateur._id})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad historiquePage');
  }

}
