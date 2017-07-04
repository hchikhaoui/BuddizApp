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

  cards: Array<any>;
  removedcards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  removedCard: any = null;
  compt: number = 0 ;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
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
    
    this.cards = [{ id: null, nom: '' }];
    this.removedcards = [{ id: null, nom: '', score: 0 }];
    
    this.addNewCards(1);
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
 
// Connected through HTML
voteUp(like: boolean) {
    this.removedCard = this.cards.pop();
    this.removedCard.score = 0;
  this.compt++;
  this.addNewCards(this.compt);
  if (like) {
      this.removedCard.score++;
      this.recentCard = 'You liked: ' + this.removedCard.nom;
  } else {
      this.removedCard.score--;
      this.recentCard = 'You disliked: ' + this.removedCard.nom;
  }
  this.removedcards.push(this.removedCard)
    //alert(JSON.stringify(this.removedcards))
}

// Add new cards to our array
addNewCards(count: number) {
    let val = { id: count, nom: "assets/img/city-wallpaper-" + count + ".jpg"}
    this.cards.push(val);

/*   this.http.get('https://randomuser.me/api/?results=' + count)
  .map(data => data.json().results)
  .subscribe(result => {
    for (let val of result) { alert(JSON.stringify(result))
      this.cards.push(val);
    }
  }) */
}
 
// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
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
