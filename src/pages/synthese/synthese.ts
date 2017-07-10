import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


import {SuggestionsPage} from '../suggestions/suggestions'
import {VotePage} from '../vote/vote'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
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

  public recherche: Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: []
  }
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {

    this.recherche.id = navParams.get('id');
    this.recherche.nom = navParams.get('nom');
    this.recherche.description = navParams.get('description');
    this.recherche.date = navParams.get('date');
    this.recherche.lieu = navParams.get('lieu');
    this.recherche.cartes = navParams.get('cartes');
  }

  Suggestions(event) {
    this.navCtrl.push(SuggestionsPage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes
    });
  }

  Vote(event) {
    this.navCtrl.push(VotePage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes
    });
  }

  Synthese(event) {
    this.navCtrl.push(SynthesePage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynthesePage');
  }

}
