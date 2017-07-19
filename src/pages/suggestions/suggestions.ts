import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
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

import {AccueilPage} from '../accueil/accueil'
import {VotePage} from '../vote/vote'
import {SynthesePage} from '../synthese/synthese'

import { OptionsPage } from '../../modals/sortie_options';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
  public key = '5841085-af19f9062faa1907624960285'
  public stackConfig: StackConfig;
  public msg: string = '';

  public sorties: Array<Sortie> = []
  public ii: number
  public recherche: Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
      favoris: []
  }
  constructor(public auth:Auth, public user: User,public modalCtrl: ModalController, private http: Http, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
      if(navParams.get('id')){
        this.recherche.id = navParams.get('id')
      }else {
        this.recherche.id = Math.floor(Math.random() * (100000000000000));
      }
      if(navParams.get('cartes')){
        this.recherche.cartes = navParams.get('cartes');
      }
    if(navParams.get('favoris')){
      this.recherche.favoris = navParams.get('favoris');
    }
      this.recherche.nom = navParams.get('nom');
      this.recherche.description = navParams.get('description');
      this.recherche.date = navParams.get('date');
      this.recherche.lieu = navParams.get('lieu');


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



    //localStorage.setItem(this.recherche.id.toString(), JSON.stringify(this.recherche))

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
  }

  voteUp(like: boolean) {
    var exist = false
    this.removedCard = this.cards.pop()
    this.recentCard = this.cards[this.cards.length - 1]
    if (like) {
      for( let c in this.recherche.cartes ){
        if(JSON.stringify(this.recherche.cartes[c]) == JSON.stringify(this.removedCard)){
          let alert = this.alertCtrl.create({
            title:'existe dèjà!',
            subTitle:'Vérifier vos cartes',
            buttons:['OK']
          });
          alert.present();
          exist = true
        }
      }

      if(exist == false){
        this.recherche.cartes.push(this.removedCard)

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


      this.msg = 'You liked: ' + this.removedCard._id;

    } else {
      this.msg = 'You disliked: ' + this.removedCard._id;
    }

  }


  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.addNewCards();
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


private FixerHeader() {
            let headers = new Headers({ 'deviceToken': 'DT-1000000000000000000000000000000000000002' });
            headers.append('Accept', 'application/json')
            return new RequestOptions({ headers: headers });

}

addNewCards() {

  let cartee1= {
  _id: "59637e6b7a5a2f794f5dc3ec",

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

  let cartee2= {
    _id: "59637e6b7a5a2f794f5dc3ec",

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

  let cartee3= {
    _id: "59637e6b7a5a2f794f5dc3ec",

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
    _id: "59637e6b7a5a2f794f5dc3ec",

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

  let cartee5= {
    _id: "59637e6b7a5a2f794f5dc3ec",

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

  let cartee6= {
    _id: "59637e6b7a5a2f794f5dc3ec",

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

  let cartee7= {
    _id: "59637e6b7a5a2f794f5dc3ec",

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

  this.cards.push(cartee1)
  this.cards.push(cartee2)
  this.cards.push(cartee3)
  this.cards.push(cartee4)
  this.cards.push(cartee5)
  this.cards.push(cartee6)
  this.cards.push(cartee7)

return this.cards
//return this.http.get('https://appfront.dev.buddiz.io:443/search/596378e97a5a2f794f5dc3c2/elements/suggestions?useCase=places', this.FixerHeader()).subscribe((response: Response) => {console.log(response.json());this.cards = response.json()}, (error: any) => console.log('error data'));
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
    console.log('ionViewDidLoad SuggestionsPage');
  }

}
