import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';
import { UsermodalComponent } from 'src/app/components/usermodal/usermodal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermodalComponent,
    UsersPageRoutingModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {
  change(event){
    if(event.detail.checked){
document.body.setAttribute('color-theme','dark');
    }else{
      document.body.setAttribute('color-theme','light');
    }
  }
}
