import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula'

import { SuggestionsPage } from '../suggestions/suggestions'
import { SynthesePage } from '../synthese/synthese'
import { AccueilPage } from '../accueil/accueil'

import { DetailsPropositionPage } from '../../modals/details_proposition'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
import {Utilisateur} from '../../models/utilisateur'
import {Elementt} from '../../models/elementt';

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

    public q: Elementt
    public elements: Array<Elementt>
    public utilisateur: Utilisateur = {
    _id: '',
    userProfile: {userName: '', userMail: ''},
    deviceTokens: [],
    searches: [],
    accessControl: {
      appRoles: [],
      appGroups: [],
      users: [],
      groups: [],
      permissions: []
    }
  }

    public usr = this.utilisateur._id
    public sortie: Sortie = {
    accessControl:{
    userPermissionsOnApp: [],
    userPermissionsOnObject: [],
    users: {
      usr: [
        "searchOwner",
        "searchContributor",
        "searchViewer"
      ]
    }
  },
  _id: '',
  searchParameters:{
    useCase: '',
    useCaseParams: [], 
      isOpen: '',
       name: '',
      timeStamp: null
    },
      elementSelected: [],
      elementExcluded: [],
      elementLiked: [],
      elementDisliked: [],
      created_At: null
    }


constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, publicviewCtrl: ViewController, private dragulaService: DragulaService, public alertCtrl: AlertController, private http: Http) {

    dragulaService.setOptions('my-bag', {
        copy: false,                       // elements are moved by default, not copied
        copySortSource: true,             // elements in copy-source containers can be reordered
        revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
        removeOnSpill: true,              // spilling will `.remove` the element, if this is true
        mirrorContainer: document.body,    // set the element that gets mirror elements appended
        ignoreInputTextSelection: true     // allows users to select input text, see details below
    });

    if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
    this.sortie = navParams.get('sortie');
    this.elements = this.sortie.elementSelected
      dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
}

  private onDrag(args) {
    let [e, el] = args;
    this.http.put('https://appfront.dev.buddiz.io:443/search/'+this.sortie._id,JSON.stringify(this.sortie),this.FixerHeaderPUTorPOST())
  }

AjouterAuFavoris(item: Elementt) {
    this.q = item
    
    if(this.sortie.elementSelected.find(x => x._id === item._id)){
        let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos favoris',
        buttons:['OK']
      });
      alert.present();
    }else{ let elmt: Elementt
        this.http.get('https://appfront.dev.buddiz.io:443/element/'+item._id, this.FixerHeaderGET()).subscribe((response: Response) => {console.log(response.json()); elmt = response.json()}, (error: any) => console.log('error data'));    if(elmt.detailedInformation.rating){
          elmt.detailedInformation.rating++;
        }else{
          elmt.detailedInformation.rating = 1;
        }

        this.sortie.elementSelected.push(item)
        this.http.put('https://appfront.dev.buddiz.io:443/element/'+elmt._id, JSON.stringify(elmt),this.FixerHeaderPUTorPOST())
    }

    this.http.put('https://appfront.dev.buddiz.io:443/search/'+this.sortie._id,JSON.stringify(this.sortie),this.FixerHeaderPUTorPOST())

}

PlusDetails(item: Elementt) {
    let modal = this.modalCtrl.create(DetailsPropositionPage,{item: item});
    modal.present();
}



private FixerHeaderGET() {
  let headers = new Headers({ 'deviceToken': 'DT-1000000000000000000000000000000000000002' });
  headers.append('Accept', 'application/json')
  return new RequestOptions({ headers: headers });
  }

  private FixerHeaderPUTorPOST() {
  let headers = new Headers({ 'deviceToken': 'DT-1000000000000000000000000000000000000002' });
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return new RequestOptions({ headers: headers });
}


Accueil(event){
  this.navCtrl.setRoot(AccueilPage, {user_id: this.utilisateur._id})
}

Suggestions(event) {
    this.navCtrl.setRoot(SuggestionsPage,{sortie: this.sortie, user_id: this.utilisateur._id});
}

Vote(event) {
    this.navCtrl.setRoot(VotePage,{sortie: this.sortie, user_id: this.utilisateur._id});
}

Synthese(event) {
    this.navCtrl.setRoot(SynthesePage,{sortie: this.sortie, user_id: this.utilisateur._id});
}

ionViewDidLoad() {
    console.log('ionViewDidLoad votePage');
}

}


// if(this.auth.isAuthenticated()){
//           this.sorties.find(x => x.id === this.sortie.id).favoris = this.sortie.favoris
//           this.user.set('sorties', this.sorties)
//           this.user.save()        
//         }


    // if(this.auth.isAuthenticated()){
    //   this.sorties.find(x => x.id === this.sortie.id).favoris = this.sortie.favoris
    //   this.user.set('sorties', this.sorties)
    //   this.user.save()
    // }

// if(this.auth.isAuthenticated()){
//         this.sorties = this.user.get('sorties', null)
//         if(this.sorties == null){
//           this.sorties = []
//           this.sorties.push(this.sortie)
//           this.user.set('sorties', this.sorties)
//           this.user.save()
//         }else{
//           if(this.sorties.find(x => x.id === this.sortie.id)){
//             this.sortie = this.sorties.find(x => x.id === this.sortie.id)
//           }else{
//             this.sorties.push(this.sortie)
//             this.user.set('sorties', this.sorties)
//             this.user.save()
//           }
//         }
//       }