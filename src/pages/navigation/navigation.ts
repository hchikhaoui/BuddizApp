import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, NavController, ModalController, NavParams, App } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
import { SynthesePage } from '../synthese/synthese';
import { OptionsPage } from '../../modals/sortie_options';

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

//    @ViewChild(Nav) nav: Nav;
    @ViewChild(NavController) nav: NavController;
rootPage = AccueilPage;
pages: Array<{title: string, component: any}>;

public historiques: Array<Sortie> = []
archive = [];

constructor(public modalCtrl: ModalController, private app: App,public menuCtrl: MenuController) {
    this.HistoriqueDesRecherches()
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Suggestions', component: SuggestionsPage },
      { title: 'Vote', component: VotePage },
      { title: 'Synthese', component: SynthesePage },      
    ];
}

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
                  cartes: JSON.parse(this.archive[i])['cartes']
                })
                console.log(JSON.stringify(this.historiques))
            }
        }
        // alert(JSON.stringify(this.historiques))
  }

  OptionsModal(option: string){
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }

  openPage(page) {

    this.menuCtrl.close();

    this.app.getActiveNav().push(page.component)  
  }

}
