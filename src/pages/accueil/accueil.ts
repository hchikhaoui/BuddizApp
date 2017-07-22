import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List, AlertController, ModalController } from 'ionic-angular';

//import { ModalPage } from '../modal/modal';
import { CriteriaPage } from '../../modals/fixer_criteres';
import { OptionsPage } from '../../modals/sortie_options';
import { HistoriquePage } from '../historique/historique';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
import { SynthesePage } from '../synthese/synthese';
import { NavigationPage } from '../navigation/navigation';
import { AuthentificationPage } from '../authentification/authentification';

import {Sortie} from '../../models/sortie'
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

instant = new Date().toISOString()
  public historiques: Array<Sortie> = []
  archive = [];

  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
//  localStorage.clear()
      this.HistoriqueDesRecherches()
  }


  CriteriaModal() {
    let modal = this.modalCtrl.create(CriteriaPage);
    modal.present();
  }


  OptionsModal(option: string){
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }

  Accueil(event){
    this.navCtrl.popToRoot()
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

  historique(event, hist) {
    this.navCtrl.push(HistoriquePage
    ,{
      id: hist.id,
      nom: hist.nom,
      description: hist.description,
      date: hist.date,
      lieu: hist.lieu,
      cartes: hist.cartes,
        favoris: hist.favoris
    }
    );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddizPage');
  }

}
