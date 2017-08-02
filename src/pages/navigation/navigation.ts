import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, NavController, ModalController, NavParams, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
import { SynthesePage } from '../synthese/synthese';
import { OptionsPage } from '../../modals/sortie_options';
import { AddFriendsPage } from '../../modals/add_friends';

import {Sortie} from '../../models/sortie'


/**
 * Generated class for the NavigationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage {

public pages: Array<{title: string, component: any, icon: string}>;
public historiques: Array<Sortie> = []
public archive = [];

constructor(public auth:Auth, public user: User, public modalCtrl: ModalController, private app: App,public menuCtrl: MenuController, /*public navCtrl: NavController*/) {
    this.HistoriqueDesRecherches()
    this.pages = [
      { title: 'Accueil', component: AccueilPage, icon: 'home' },
      { title: 'Suggestions', component: SuggestionsPage, icon: 'search'},
      { title: 'Vote', component: VotePage, icon: 'thumbs-up' },
      { title: 'Synthese', component: SynthesePage, icon: 'stats' },
      { title: 'Ajouter des amis', component: AddFriendsPage, icon: 'people' },
    ];
}

  HistoriqueDesRecherches(){
    if(this.auth.isAuthenticated()){
      this.historiques = this.user.get('sorties', null)
    }
  }
  
  OptionsModal(option: string){
  if(option == 'Accueil'){

  }else if(option == 'Ajouter des amis'){
    let ctrb = this.modalCtrl.create(AddFriendsPage)
    ctrb.present();
  }
  else{
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }
  this.menuCtrl.close();
  }

  // openPage(page) {
  //   this.menuCtrl.close();
  //   this.app.getActiveNav().push(page.component)
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigationPage');
  }

}
