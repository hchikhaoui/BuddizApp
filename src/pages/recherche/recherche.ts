import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula , DragulaService } from 'ng2-dragula/ng2-dragula';

/**
 * Generated class for the recherchePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
  providers: [DragulaService]
})
export class RecherchePage {

q1 = [];
q2 = [];

public recherche:{
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private dragulaService: DragulaService) {
    this.recherche.id = Math.floor(Math.random() * (100000000000000)) ;
    this.recherche.nom = navParams.get('nom');
    this.recherche.description = navParams.get('description');
    this.recherche.date = navParams.get('date');
    this.recherche.lieu = navParams.get('lieu');
// localStorage.clear()
    localStorage.setItem(this.recherche.id.toString(), JSON.stringify(this.recherche))

    for (var i = 1; i < 49; i++) {
      this.q1.push("assets/img/city-wallpaper-preview-" + i + ".jpg");
      this.q2.push("assets/img/city-wallpaper-preview-" + i + ".jpg");

      // this.q2.push("2. <" + i + ">");
    }
// /root/Desktop/BuddizApp/src/assets/img/city-wallpaper-preview-27.jpg

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
