import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotesPage } from '../votes/votes';
import { SynthesePage } from '../synthese/synthese';




/**
 * Generated class for the NavigationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage {

@ViewChild(Nav) nav: Nav;
rootPage = AccueilPage;
pages: Array<{title: string, component: any}>;

constructor(public menuCtrl: MenuController) {
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Suggestions', component: SuggestionsPage },
      { title: 'Votes', component: VotesPage },
      { title: 'Synthese', component: SynthesePage },      
    ];
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigationPage');
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menuCtrl.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
