import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-details-proposition',
    templateUrl: 'details_proposition.html',
})
export class DetailsPropositionPage {
    plusdephotos = []
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        for (var i = 1; i < 49; i++) {
            this.plusdephotos.push("assets/img/city-wallpaper-preview-" + i + ".jpg");
        }
    }

    
    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPropositionPage');
    }

}
