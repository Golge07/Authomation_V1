import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShelfsPageRoutingModule } from './shelfs-routing.module';
import { ShelfsPage } from './shelfs.page';
import { ShelfmodalComponent } from 'src/app/components/shelfmodal/shelfmodal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShelfmodalComponent,
    ShelfsPageRoutingModule
  ],
  declarations: [ShelfsPage],
  entryComponents:[ShelfmodalComponent]
})
export class ShelfsPageModule {
 
}
