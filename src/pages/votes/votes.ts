import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

/**
 * Generated class for the VotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-votes',
  templateUrl: 'votes.html',
  providers: [DragulaService]
})
export class VotesPage {
    q1 = [];
    q2 = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private dragulaService: DragulaService) {
        for (var i = 1; i < 49; i++) {
            this.q1.push("assets/img/city-wallpaper-preview-" + i + ".jpg");
            //this.q2.push("assets/img/city-wallpaper-preview-" + i + ".jpg");
            // this.q2.push("2. <" + i + ">");
        }
        this.q2.push("assets/img/city-wallpaper-preview-" + 1 + ".jpg");
        dragulaService.setOptions('my-bag', {
            removeOnSpill: true,
            revertOnSpill: true,
        });

        dragulaService.drag.subscribe((value) => {
            // this.onDrag(value.slice(1));
        });

        dragulaService.drop.subscribe((value) => {
            // this.onDrop(value.slice(1));
        });

        dragulaService.over.subscribe((value) => {
            // this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {
            // this.onOut(value.slice(1));
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad recherchePage');
    }

}
