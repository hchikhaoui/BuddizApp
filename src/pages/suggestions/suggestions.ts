import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
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

import {VotePage} from '../vote/vote'
import {SynthesePage} from '../synthese/synthese'
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

  key = '5841085-af19f9062faa1907624960285'
  stackConfig: StackConfig;
  
  cards: Array<Carte> = [] ;
  removedCard: Carte = null
  recentCard: Carte = null
  
  msg: string = '';
  
  public recherche: Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      img: []
  }
  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {

      this.recherche.id = Math.floor(Math.random() * (100000000000000));
      this.recherche.nom = navParams.get('nom');
      this.recherche.description = navParams.get('description');
      this.recherche.date = navParams.get('date');
      this.recherche.lieu = navParams.get('lieu');
      // localStorage.clear()
      localStorage.setItem(this.recherche.id.toString(), JSON.stringify(this.recherche))

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

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.addNewCards();
  }

  voteUp(like: boolean) {
  this.removedCard = this.cards.pop()
  this.recentCard = this.cards[this.cards.length - 1]
  if (like) {
      this.recherche.img.push(this.removedCard.webformatURL)
      localStorage.setItem(this.recherche.id.toString(), JSON.stringify(this.recherche))
      this.msg = 'You liked: ' + this.removedCard.id;
  } else {
      this.msg = 'You disliked: ' + this.removedCard.id;
    }
  }

  addNewCards() {
    this.http.get('https://pixabay.com/api/?key=' + this.key + '&q=yellow+flowers&image_type=photo&pretty=true')
        .subscribe(data => {
            this.cards = data.json().hits
            console.log(JSON.stringify(this.cards))
              }, 
              error => console.log('error while downloading image'))
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
    console.log('ionViewDidLoad SuggestionsPage');
  }

}
