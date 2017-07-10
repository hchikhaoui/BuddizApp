import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { VotePage } from '../pages/vote/vote';
import { SynthesePage } from '../pages/synthese/synthese';

import { Sortie } from '../models/sortie'
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
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.opt = navParams.get('opt')
        this.hist = navParams.get('hist')
    }


    itemTapped(event, h) {

        if(this.opt == 'Suggestions'){
            this.navCtrl.push(SuggestionsPage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            cartes: h.cartes,
        })
        }else if(this.opt == 'Vote'){
            this.navCtrl.push(VotePage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            cartes: h.cartes,
        })
        }else {
          this.navCtrl.push(SynthesePage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            cartes: h.cartes,
        })  
        }


        // this.navCtrl.push(SuggestionsPage, {
        //     nom: this.sortie.nom,
        //     description: this.sortie.description,
        //     date: this.sortie.date,
        //     lieu: this.sortie.lieu
        // });
    
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad OptionsPage');
    }

}
