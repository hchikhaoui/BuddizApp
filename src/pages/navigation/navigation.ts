import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, NavController, ModalController, NavParams, App } from 'ionic-angular';

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

constructor(public modalCtrl: ModalController, private app: App,public menuCtrl: MenuController) {
    this.HistoriqueDesRecherches()
    this.pages = [
      { title: 'Accueil', component: AccueilPage, icon: 'home' },
      { title: 'Suggestions', component: SuggestionsPage, icon: 'search'},
      { title: 'Vote', component: VotePage, icon: 'thumbs-up' },
      { title: 'Synthese', component: SynthesePage, icon: 'stats' },
      { title: 'Contribution', component: AddFriendsPage, icon: 'people' },
    ];
}
x: string = 'home'

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigationPage');
  }

  HistoriqueDesRecherches()
    {
      let j = 0
        for (var i = 0; i<localStorage.length; i++) {
            this.archive[i] = localStorage.getItem(localStorage.key(i));
            if (JSON.parse(this.archive[i])['lieu']) {
                j++
                this.historiques.push({
                  id: JSON.parse(this.archive[i])['id'],
                  nom: JSON.parse(this.archive[i])['nom'],
                  description: JSON.parse(this.archive[i])['description'],
                  date: JSON.parse(this.archive[i])['date'],
                  lieu: JSON.parse(this.archive[i])['lieu'],
                  cartes: JSON.parse(this.archive[i])['cartes'],
                  favoris: JSON.parse(this.archive[i])['favoris']

                })
                console.log(JSON.stringify(this.historiques))
            }
        }
  }

  OptionsModal(option: string){
  if(option == 'Accueil'){
    //this.app.getActiveNav().push(AccueilPage)
  }else if(option == 'Contribution'){
    let ctrb = this.modalCtrl.create(AddFriendsPage)
    ctrb.present();
  }
  else{
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }
  this.menuCtrl.close();
  }

  openPage(page) {

    this.menuCtrl.close();

    this.app.getActiveNav().push(page.component)
  }

}
