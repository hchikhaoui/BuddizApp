import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ViewController } from 'ionic-angular';
import {Sortie} from '../models/sortie'
import {Carte} from '../models/carte'
import {Utilisateur} from '../models/utilisateur'
import {Elementt} from '../models/elementt';

@IonicPage()
@Component({
    selector: 'page-details-proposition',
    templateUrl: 'details_proposition.html',
})
export class DetailsPropositionPage {

  public  elmt: Elementt

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

    public plusdephotos: Array<string> = []
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
      if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
      this.elmt = navParams.get('item')
      for(let c in this.elmt.comments){
        for(let a in this.elmt.comments[c].attributions){
          this.plusdephotos.push(this.elmt.comments[c].attributions[a].photo)
        }
      }

    }

  closeModal() {
    this.viewCtrl.dismiss();
  }


    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPropositionPage');
    }

}
