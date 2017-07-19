import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula'

import { SuggestionsPage } from '../suggestions/suggestions'
import { SynthesePage } from '../synthese/synthese'
import { AccueilPage } from '../accueil/accueil'

import { DetailsPropositionPage } from '../../modals/details_proposition'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'

import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

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

    public q: Carte
    public recherche: Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
      favoris: []
  }

  public sorties: Array<Sortie> = []
  public ii: number

constructor(public auth:Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, publicviewCtrl: ViewController, private dragulaService: DragulaService, public alertCtrl: AlertController) {
    this.recherche.id = navParams.get('id');
    this.recherche.nom = navParams.get('nom');
    this.recherche.description = navParams.get('description');
    this.recherche.date = navParams.get('date');
    this.recherche.lieu = navParams.get('lieu');
    this.recherche.cartes = navParams.get('cartes');
    this.recherche.favoris = navParams.get('favoris');


  if(this.auth.isAuthenticated())
  {
    if(this.user.get('sorties', null) == null){
      this.sorties.push(this.recherche)
      this.user.set('sorties', this.sorties)
      this.user.save()
    }else{
      this.sorties = this.user.get('sorties', null)
      let found = false
      for(let i in this.sorties){
        if(this.sorties[i].id == this.recherche.id){
          this.ii = this.sorties.indexOf(this.sorties[i])
          found = true
        }
      }
      if(found == false){
        this.sorties.push(this.recherche)
        this.user.set('sorties', this.sorties)
        this.user.save()
      }
    }
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

AjouterAuFavoris(item: Carte) {
    if (this.recherche.favoris.indexOf(item) == -1){
        this.recherche.favoris.push(item)

      if(this.auth.isAuthenticated()){
        if(this.user.get('sorties', null) == null){
          this.sorties.push(this.recherche)
          this.user.set('sorties', this.sorties)
          this.user.save()
        }else{
          this.sorties = this.user.get('sorties', null)
          let found = false
          for(let i in this.sorties){
            if(this.sorties[i].id == this.recherche.id){
              this.ii = this.sorties.indexOf(this.sorties[i])
              found = true
            }
          }
          if(found == false){
            this.sorties.push(this.recherche)
            this.user.set('sorties', this.sorties)
            this.user.save()
          }else{
            this.sorties[this.ii] = this.recherche
            this.user.set('sorties', this.sorties)
            this.user.save()
          }
        }
      }

        //localStorage.setItem(this.recherche.id.toString(), JSON.stringify(this.recherche))
    }
    this.q = item
}

PlusDetails(item: Carte) {
    let modal = this.modalCtrl.create(DetailsPropositionPage,{item: item});
    modal.present();
}


Accueil(event){
  this.navCtrl.popToRoot()
}

Suggestions(event) {
    this.navCtrl.push(SuggestionsPage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes,
      favoris: this.recherche.favoris
    });
}

Vote(event) {
    this.navCtrl.push(VotePage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes,
      favoris: this.recherche.favoris
    });
}

Synthese(event) {
    this.navCtrl.push(SynthesePage,{
      id: this.recherche.id,
      nom: this.recherche.nom,
      description: this.recherche.description,
      date: this.recherche.date,
      lieu: this.recherche.lieu,
      cartes: this.recherche.cartes,
      favoris: this.recherche.favoris
    });
}

ionViewDidLoad() {
    console.log('ionViewDidLoad votePage');
}

}
