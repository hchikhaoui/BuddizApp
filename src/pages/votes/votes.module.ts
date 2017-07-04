import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotesPage } from './votes';

@NgModule({
  declarations: [
    VotesPage,
  ],
  imports: [
    IonicPageModule.forChild(VotesPage),
  ],
  exports: [
    VotesPage
  ]
})
export class VotesPageModule {}
