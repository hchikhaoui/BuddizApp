import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {SuggestionsPage} from '../suggestions/suggestions'
import {VotePage} from '../vote/vote'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
import {Utilisateur} from '../../models/utilisateur'
import {Elementt} from '../../models/elementt';


import {AccueilPage} from "../accueil/accueil";
/**
 * Generated class for the SynthesePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-synthese',
  templateUrl: 'synthese.html',
})
export class SynthesePage {

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
public usr = this.utilisateur._id
public sortie: Sortie = {
    accessControl:{
    userPermissionsOnApp: [],
    userPermissionsOnObject: [],
    users: {
      usr: [
        "searchOwner",
        "searchContributor",
        "searchViewer"
      ]
    }
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

  public sorties: Array<Sortie>

  constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {

    if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
    this.sortie = navParams.get('sortie');
  }

  Accueil(event){
    this.navCtrl.setRoot(AccueilPage, {user_id: this.utilisateur._id})
  }

  Suggestions(event) {
    this.navCtrl.setRoot(SuggestionsPage,{sortie: this.sortie, user_id: this.utilisateur._id});
  }

  Vote(event) {
    this.navCtrl.setRoot(VotePage,{sortie: this.sortie, user_id: this.utilisateur._id});
  }

  Synthese(event) {
    this.navCtrl.setRoot(SynthesePage,{sortie: this.sortie, user_id: this.utilisateur._id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynthesePage');
  }

}
