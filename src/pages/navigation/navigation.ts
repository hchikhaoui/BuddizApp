import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, NavController,NavParams, App } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
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

//    @ViewChild(Nav) nav: Nav;
    @ViewChild(NavController) nav: NavController;
rootPage = AccueilPage;
pages: Array<{title: string, component: any}>;

constructor(private app: App,public menuCtrl: MenuController) {
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Suggestions', component: SuggestionsPage },
      { title: 'Vote', component: VotePage },
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
    this.app.getActiveNav().push(page.component)  
  }

}
