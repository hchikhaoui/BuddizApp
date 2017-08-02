import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { VotePage } from '../pages/vote/vote';
import { SynthesePage } from '../pages/synthese/synthese';

import { Sortie } from '../models/sortie'
import {Utilisateur} from '../models/utilisateur'

import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-options',
    templateUrl: 'sortie_options.html',
})
export class OptionsPage {

    public opt: string
    public hist: Array<Sortie>
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

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.opt = navParams.get('opt')
        this.hist = navParams.get('hist')
        if(localStorage.getItem(navParams.get('user_id'))){
            this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
        }
    }

  closeModal() {
    this.viewCtrl.dismiss();
  }

    itemTapped(event, h) {
        if(this.opt == 'Suggestions'){
            this.navCtrl.setRoot(SuggestionsPage, {sortie: h, user_id: this.utilisateur._id})
        }else if(this.opt == 'Vote'){
            this.navCtrl.setRoot(VotePage, {sortie: h, user_id: this.utilisateur._id});
        }else {
          this.navCtrl.setRoot(SynthesePage, {sortie: h, user_id: this.utilisateur._id})
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad OptionsPage');
    }

}
