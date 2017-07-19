import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
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

public carte: Carte
public histoire:Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
      favoris: []
    }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.histoire.id = navParams.get('id');
    this.histoire.nom = navParams.get('nom');
    this.histoire.description = navParams.get('description');
    this.histoire.date = navParams.get('date');
    this.histoire.lieu = navParams.get('lieu');
    this.histoire.cartes = navParams.get('cartes');
    this.histoire.favoris = navParams.get('favoris')
  }

  AfficherDetails(image: Carte){
    this.carte = image
  }

  Accueil(ev){
    this.navCtrl.popToRoot()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad historiquePage');
  }

}
