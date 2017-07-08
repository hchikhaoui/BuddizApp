import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {SuggestionsPage} from '../suggestions/suggestions'
import {VotePage} from '../vote/vote'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

Suggestions(event) {
    this.navCtrl.push(SuggestionsPage);
  }

  Vote(event) {
    this.navCtrl.push(VotePage);
  }

  Synthese(event) {
    this.navCtrl.push(SynthesePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynthesePage');
  }

}
