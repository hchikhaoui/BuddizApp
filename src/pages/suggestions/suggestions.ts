import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, App } from 'ionic-angular';
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

import {Sortie} from '../../models/sortie';
import {Carte} from '../../models/carte';
import {Utilisateur} from '../../models/utilisateur'
import {Elementt} from '../../models/elementt';

import {AccueilPage} from '../accueil/accueil'
import {VotePage} from '../vote/vote'
import {SynthesePage} from '../synthese/synthese'

import { OptionsPage } from '../../modals/sortie_options';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

/**
 * Generated class for the SuggestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})
export class SuggestionsPage {
@ViewChild('myswing1') swingStack: SwingStackComponent;
@ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  public cards: Array<Carte> = [] ;
  public removedCard: Carte = null
  public recentCard: Carte = null
  public element: Elementt = null
  public elements: Array<Elementt> = []
  public key = '5841085-af19f9062faa1907624960285'
  public stackConfig: StackConfig;
  public msg: string = '';

  public removedElement: Elementt
  public recentElement: Elementt

  public sorties: Array<Sortie>

  public utilisateur: Utilisateur = {
    _id: '59636f57734d1d256343e27e',
    userProfile: {userName: 'df-test-user2-dev', userMail: 'jalil@buddiz.io'},
    deviceTokens: ["DT-1000000000000000000000000000000000000002"],
    searches: [],
    accessControl: {
      appRoles: ["beta1FullUser"],
      appGroups: [],
      users: {"59636f57734d1d256343e27e": [
        "userSelf"
      ]},
      groups: [],
      permissions: ["element-global-read",
      "interaction-global-list",
      "search-admin-read",
      "search-admin-update",
      "search-global-create",
      "search-global-list",
      "search-global-read",
      "search-global-update",
      "search-invitation-create",
      "search-invitation-read",
      "search-result-read",
      "search-suggestion-create",
      "search-suggestion-list",
      "search-suggestion-read",
      "search-vote-create",
      "search-vote-list",
      "search-vote-read",
      "usecase-global-list",
      "usecase-global-read",
      "user-global-list",
      "user-global-read",
      "user-global-update"]
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


  constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, private http: Http, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
      this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };

    if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
    
    if(navParams.get('sortie')){
      this.sortie = navParams.get('sortie')
    }else{
      this.sortie._id = Math.floor(Math.random() * (100000000000000)).toString()
      this.sortie.searchParameters.name = navParams.get('search_name');
      this.sortie.searchParameters.useCase = navParams.get('search_useCase');
      this.sortie.created_At = navParams.get('search_created_At');
      
      if(this.utilisateur){
        this.utilisateur.searches.push(this.sortie._id)
        this.http.put('https://appfront.dev.buddiz.io:443/user/59636f57734d1d25',JSON.stringify(this.utilisateur),this.FixerHeaderPUTorPOST()).subscribe((response: Response) => {console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+JSON.stringify(response.json()))}, (error: any) => console.log('error data'));

        this.http.get('https://appfront.dev.buddiz.io:443/user/token/device', this.FixerHeaderGET()).subscribe((response: Response) => {console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy'+JSON.stringify(response.json()))}, (error: any) => console.log('error data'))

        

        this.http.post('https://appfront.dev.buddiz.io:443/searches', JSON.stringify(this.sortie), this.FixerHeaderPUTorPOST()).subscribe((response: Response) => {console.log('*******************************************'+JSON.stringify(response.json()))}, (error: any) => console.log('error data'));
      }
      
    }
  }

addNewCards() {


  let cartee1= {
  _id: "59637e6b7a5a2f794f5dc3ec1",

  detailedInformation: {
    latitude: 48.888876237644006,
    longitude: 2.1679880524907063,
    coordinates: [
      2.1679880524907063,
      48.888876237644006
    ],
    name: "C'Sushi",
    priceRange: 2,
    useCase: [
      "places"
    ]
  },

  providersData: [
    {
      elementName: "C'Sushi",
      elementId: "4b9a918af964a5201ac235e3",
      providerName: "Foursquare",
      copyrightImageSrc: "http://highlights.com.tn/wp-content/uploads/2017/05/resto-sondage.jpg",
      useCase: [
        "places"
      ],
      lastUpdate: 1499849121137
    },
    {
      elementName: "C' Sushi",
      elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
      providerName: "Google",
      copyrightImageSrc: "https://allwine.ge/media/articles/restorani_gvino.jpg",
      useCase: [
        "places"
      ],
      lastUpdate: 1499692651740
    }
  ],


  associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

  brainScoring: {
    elementId: "59637e767a5a2f794f5dc400",
    searchId: "596378e97a5a2f794f5dc3c2",
    userId: "59636f57734d1d256343e27e",
    requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
    userScoring: 0,
    requestScoring: 0,
    searchScoring: 0,
    action: "suggested"
  }
}

  let cartee2= {
    _id: "59637e6b7a5a2f794f5dc3ec2",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "http://www.gffoodservice.org/wp-content/uploads/2015/03/restaurant-e1456862749354.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "http://www.restoranai.lt/sites/default/files/sida3790.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e777a5a2f794f5dc404",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  let cartee3= {
    _id: "59637e6b7a5a2f794f5dc3ec3",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "http://bstatic.ccmbg.com/www.linternaute.com/img/restaurant/villes/440x293/2.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "http://www.projektowanie-wnetrz-krakow.pl/wp-content/uploads/projekt_wnetrz_restauracji_browaru_w_krakowie.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e6b7a5a2f794f5dc3ec",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  let cartee4= {
    _id: "59637e6b7a5a2f794f5dc3ec4",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "https://cdn.pixabay.com/photo/2015/12/08/00/26/coffee-shop-1081713_960_720.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "https://media-cdn.tripadvisor.com/media/photo-o/0e/38/f6/7f/photo1jpg.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e6b7a5a2f794f5dc3ed",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  let cartee5= {
    _id: "59637e6b7a5a2f794f5dc3ec5",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "https://i.ytimg.com/vi/TpdFVSi7PZ8/maxresdefault.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "https://media-cdn.tripadvisor.com/media/photo-s/05/42/4f/e9/icons-coffee-shop.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e787a5a2f794f5dc408",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  let cartee6= {
    _id: "59637e6b7a5a2f794f5dc3ec6",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "https://www.procook.com.au/new/wp-content/uploads/2015/04/11-Unwritten-Rules-of-Coffee-Shop-Roberto_Ventre-e1391150672343.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "http://firstpullzone.sgmytransportpla.netdna-cdn.com/wp-content/uploads/Backlane-Coffee-3.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e787a5a2f794f5dc409",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  let cartee7= {
    _id: "59637e6b7a5a2f794f5dc3ec7",

    detailedInformation: {
      latitude: 48.888876237644006,
      longitude: 2.1679880524907063,
      coordinates: [
        2.1679880524907063,
        48.888876237644006
      ],
      name: "C'Sushi",
      priceRange: 2,
      useCase: [
        "places"
      ]
    },

    providersData: [
      {
        elementName: "C'Sushi",
        elementId: "4b9a918af964a5201ac235e3",
        providerName: "Foursquare",
        copyrightImageSrc: "http://coffeeshopibiza.com/images/Home_silde/Coffeeshop_ibiza_photo6.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499849121137
      },
      {
        elementName: "C' Sushi",
        elementId: "ChIJH3gjR21j5kcR0yB0ap_gy7c",
        providerName: "Google",
        copyrightImageSrc: "http://coffeeshopibiza.com/images/fotogallerij/Coffeeshop%20Ibiza_fotogallery_foto1.jpg",
        useCase: [
          "places"
        ],
        lastUpdate: 1499692651740
      }
    ],


    associatedElementQualificationEntry: "5965e1a17a5a2f794f5dc588",

    brainScoring: {
      elementId: "59637e777a5a2f794f5dc407",
      searchId: "596378e97a5a2f794f5dc3c2",
      userId: "59636f57734d1d256343e27e",
      requestQuery: "&useCase=places&latitude=48.8890399&longitude=2.1706564&radius=500",
      userScoring: 0,
      requestScoring: 0,
      searchScoring: 0,
      action: "suggested"
    }
  }

  this.cards.push(cartee1)
  this.cards.push(cartee2)
  this.cards.push(cartee3)
  this.cards.push(cartee4)
  this.cards.push(cartee5)
  this.cards.push(cartee6)
  this.cards.push(cartee7)

  // return this.http.get('https://appfront.dev.buddiz.io:443/search/'+ this.sortie._id +'/elements/suggestions?useCase=places', this.FixerHeaderGET()).subscribe((response: Response) => {console.log(response.json());this.cards = response.json()}, (error: any) => console.log('error data'));
}

voteUp(like: boolean) {

this.removedElement = this.elements.pop()
this.recentElement = this.elements[this.elements.length - 1]
console.log('########################'+JSON.stringify(this.removedElement)+'########################')
if (like) {
  if(this.sortie.elementLiked.find(x => x._id === this.removedElement._id)){
    let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos cartes (liked)',
        buttons:['OK']
      });
    alert.present();
  }else{
    this.sortie.elementLiked.push(this.removedElement)
  }
  this.msg = 'You liked: ' + this.removedElement._id;
}
/////////////////////////////////////////////
else {
  if(this.sortie.elementDisliked.find(x => x._id === this.removedElement._id)){
    let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos cartes (disliked)',
        buttons:['OK']
      });
    alert.present();
  }else{
    this.sortie.elementDisliked.push(this.removedElement)
  }
    this.msg = 'You disliked: ' + this.removedElement._id;
}

  // if(localStorage.getItem(this.navParams.get('user_id'))){

    // curl -X GET --header 'deviceToken: DT-1000000000000000000000000000000000000002' --header 'Accept: application/json' 'https://appfront.dev.buddiz.io:443/search/5976f98401d51242b90f2c50'

    // this.http.get('https://appfront.dev.buddiz.io:443/user/token/device', this.FixerHeaderGET()).subscribe((response: Response) => {console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+response.json())}, (error: any) => console.log('error data'))

    this.http.put('https://appfront.dev.buddiz.io:443/search/'+this.sortie._id,JSON.stringify(this.sortie),this.FixerHeaderPUTorPOST()).subscribe((response: Response) => {console.log('???????????????????????????????????????????'+response.json())}, (error: any) => console.log('error data'));
  // }

}

  Accueil(event){
    this.navCtrl.setRoot(AccueilPage, {user_id: this.utilisateur._id});
  }

  Suggestions(event) {
  this.navCtrl.setRoot(SuggestionsPage,{sortie: this.sortie, user_id: this.utilisateur._id})
  }

  Vote(event) {
    this.navCtrl.setRoot(VotePage,{sortie: this.sortie, user_id: this.utilisateur._id});
  }

  Synthese(event) {
    this.navCtrl.setRoot(SynthesePage,{sortie: this.sortie, user_id: this.utilisateur._id});
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
  
  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.addNewCards();

    for(let c in this.cards){
      let elmt: Elementt
      this.http.get('https://appfront.dev.buddiz.io:443/element/'+this.cards[c].brainScoring.elementId, this.FixerHeaderGET()).subscribe((response: Response) => {/*console.log(response.json())*/;elmt = response.json(); this.elements.push(elmt)}, (error: any) => console.log('error data'));
    }
  }

  onItemMove(element, x, y, r) {
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16*16 - abs, 16*16));
  let hexCode = this.decimalToHex(min, 2);

  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }

  element.style.background = color;
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
}

decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
}

ionViewDidLoad() {
  console.log('ionViewDidLoad SuggestionsPage');
}

}


/*
this.removedCard = this.cards.pop()
this.recentCard = this.cards[this.cards.length - 1]

if (like) {
if(this.sortie.elementLiked.find(x => x._id === this.removedCard.brainScoring.elementId)){
  let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos cartes (liked)',
        buttons:['OK']
      });
      alert.present();
}else{
  this.http.get('https://appfront.dev.buddiz.io:443/element/'+this.removedCard.brainScoring.elementId, this.FixerHeaderGET()).subscribe((response: Response) => {console.log(response.json());this.element = response.json()}, (error: any) => console.log('error data'));

  if(this.element){
    this.sortie.elementLiked.push(this.element)
  }
}
  this.msg = 'You liked: ' + this.removedCard._id;
}
/////////////////////////////////////////////

else {

  if(this.sortie.elementDisliked.find(x => x._id === this.removedCard.brainScoring.elementId)){
  let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos cartes (disliked)',
        buttons:['OK']
      });
      alert.present();
}else{
  
  this.http.get('https://appfront.dev.buddiz.io:443/element/'+this.removedCard.brainScoring.elementId, this.FixerHeaderGET()).subscribe((response: Response) => {console.log(response.json());this.element = response.json()}, (error: any) => console.log('error data'));
  
  if(this.element){
    this.sortie.elementDisliked.push(this.element)
  }
}
    this.msg = 'You disliked: ' + this.removedCard._id;
  }

  if(localStorage.getItem(this.navParams.get('user_id'))){
    this.http.put('https://appfront.dev.buddiz.io:443/search/'+this.sortie._id,JSON.stringify(this.sortie),this.FixerHeaderPUTorPOST())
  }
*/



















// this.sorties.find(x => x.id === this.sortie.id).cartes = this.sortie.cartes
  // this.user.set('sorties', this.sorties)
  // this.user.save()
