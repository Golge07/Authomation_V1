import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShelfmodalComponent } from 'src/app/components/shelfmodal/shelfmodal.component';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';
import { SearchService } from 'src/app/services/http/search.service';
import { ShelfService } from 'src/app/services/http/shelf.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private httpShelf:ShelfService,private global: GlobalService, private alerts: AlertService, private modalctrl: ModalController,private searchService:SearchService) { }
  select;
  items = []
  v;
  selects = [{ name: 'All', }, { name: 'Name', }, { name: 'Type', }, { name: 'Comment', }, { name: 'Quantity', }, { name: 'ShelfNumber', }];
  ngOnInit() {
    this.httpShelf.index().subscribe(res=>{this.items = res['data']})
  }
  async openmodal(id, name, type, quantity, number, comment,items) {
    const modal = await this.modalctrl.create({
      component: ShelfmodalComponent, componentProps: {
        id:id, name:name, type:type, quantity:quantity, number:number, comment:comment, Refresh: () => {
          this.search(this.v)
        }
      }
    })
    return modal.present()
  }
  search(value) {
    if (value != "" && value != undefined) {
      this.v = value
      if (this.select == undefined) {
        const body = {value:this.v.trim(),type:"Global",per:this.global.user.permission}
        this.searchService.searchItem(body).subscribe((res) => { this.items = res['data'] })
      }
      else {
        const body= {type:this.select.trim() == "All" ? "Global": this.select.trim(),value: value.trim(),per:this.global.user.permission}
        this.searchService.searchItem(body).subscribe((res) => {
          this.items = res['data']
        })
      }
    }
    else {
      this.httpShelf.index().subscribe((res) => {
        this.items = res['data'];
      })
    }
  } 
}
