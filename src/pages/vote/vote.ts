import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula'

import { SuggestionsPage } from '../suggestions/suggestions'
import { SynthesePage } from '../synthese/synthese'

import { DetailsPropositionPage } from '../../modals/details_proposition'
/**
 * Generated class for the VotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-vote',
    templateUrl: 'vote.html',
    providers: [DragulaService]
})
export class VotePage {
    q: any
    q1 = [];
    q2 = [];

    constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private dragulaService: DragulaService, public alertCtrl: AlertController) {
        for (var i = 1; i < 49; i++) {
            this.q1.push("assets/img/city-wallpaper-preview-" + i + ".jpg");
        }
        dragulaService.setOptions('my-bag', {
            copy: false,                       // elements are moved by default, not copied
            copySortSource: true,             // elements in copy-source containers can be reordered
            revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: true,              // spilling will `.remove` the element, if this is true
            mirrorContainer: document.body,    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below

        });
    }

    PlusDetails() {
        let modal = this.modalCtrl.create(DetailsPropositionPage);
        modal.present();
    }

    private onDrag(args) {
        let [e, el] = args;
        // do something
    }

    private onDrop(args) {
        let [e, el] = args;
        // do something
    }

    private onOver(args) {
        let [e, el, container] = args;
        // do something
    }

    private onOut(args) {
        let [e, el, container] = args;
        // do something
    }

    Ajouter(item: any) {
        if (this.q2.indexOf(item) == -1)
            this.q2.push(item)
        this.q = item
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
        console.log('ionViewDidLoad votePage');
    }

}
