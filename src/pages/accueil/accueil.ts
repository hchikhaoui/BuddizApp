import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List, AlertController, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';
import { HistoriquePage } from '../historique/historique';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotesPage } from '../votes/votes';
import { SynthesePage } from '../synthese/synthese';
import { NavigationPage } from '../navigation/navigation';
import { AuthentificationPage } from '../authentification/authentification';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {
    
instant = new Date().toISOString()
  public historiques: Array<{
    id: any,
    nom: any,
    description: any,
    date: any,
    lieu: any,
    img: any
  }> = []
  archive = [];
  
  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.HistoriqueDesRecherches()
    // localStorage.clear()
  }

  RechercheModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  HistoriqueDesRecherches()
    {let j = 0
        for (var i = 0; i<localStorage.length; i++) {
            this.archive[i] = localStorage.getItem(localStorage.key(i));
            if(JSON.parse(this.archive[i])['lieu']){
                j++
                this.historiques.push({
                  id: JSON.parse(this.archive[i])['id'],
                  nom: JSON.parse(this.archive[i])['nom'],
                  description: JSON.parse(this.archive[i])['description'],
                  date: JSON.parse(this.archive[i])['date'],
                  lieu: JSON.parse(this.archive[i])['lieu'],
                  img: 'city-wallpaper-' + j.toString() + '.jpg' 
                   })
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
      lieu: hist.lieu
    }
    );
  }

  Suggestions(event) {
    this.navCtrl.push(SuggestionsPage);
  }

  Votes(event) {
    this.navCtrl.push(VotesPage);
  }

  Synthese(event) {
    this.navCtrl.push(SynthesePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddizPage');
  }

}
