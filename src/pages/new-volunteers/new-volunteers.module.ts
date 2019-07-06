import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewVolunteersPage } from './new-volunteers';

@NgModule({
  declarations: [
    NewVolunteersPage,
  ],
  imports: [
    IonicPageModule.forChild(NewVolunteersPage),
  ],
})
export class NewVolunteersPageModule {}
