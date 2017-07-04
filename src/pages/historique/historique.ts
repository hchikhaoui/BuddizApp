import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
public histoire:{
    id: number,
    nom: string,
    description: string,
    date: String, 
    lieu: string
  } = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: ''
    }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.histoire.id = navParams.get('id');
    this.histoire.nom = navParams.get('nom');
    this.histoire.description = navParams.get('description');
    this.histoire.date = navParams.get('date');
    this.histoire.lieu = navParams.get('lieu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad historiquePage');
  }

}
