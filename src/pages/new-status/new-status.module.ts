import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStatusPage } from './new-status';

@NgModule({
  declarations: [
    NewStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(NewStatusPage),
  ],
})
export class NewStatusPageModule {}
