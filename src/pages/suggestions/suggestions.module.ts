import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionsPage } from './suggestions';

@NgModule({
  declarations: [
    SuggestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestionsPage),
  ],
  exports: [
    SuggestionsPage
  ]
})
export class SuggestionsPageModule {}
