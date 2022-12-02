import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { AlertService } from 'src/app/services/alert.service';
import { ShelfmodalComponent } from 'src/app/components/shelfmodal/shelfmodal.component';
import { ShelfService } from 'src/app/services/http/shelf.service';
import { SearchService } from 'src/app/services/http/search.service';
@Component({
  selector: 'app-shelfs',
  templateUrl: './shelfs.page.html',
  styleUrls: ['./shelfs.page.scss'],
})
export class ShelfsPage implements OnInit {
  constructor(private httpShelf:ShelfService,private global: GlobalService, private alerts: AlertService, private modalctrl: ModalController,private searchService:SearchService) { }
  btn = JSON.parse(localStorage.getItem('user')).permission <=3
  ngOnInit() {
    this.global.user = JSON.parse(localStorage.getItem('user'))
    this.httpShelf.index().subscribe(res=>{this.items = res['data']})
    this.global.menuName = "Shelf Page"
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
  items = []
  select;
  selects = [{ name: 'All', }, { name: 'Name', }, { name: 'Type', }, { name: 'Comment', }, { name: 'Quantity', }, { name: 'ShelfNumber', }
  ];
  v
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
  handleChange(ev) {
    this.select = ev.target.value;
  }
  alert ={
    css:"alert",
    translucent: true,
  }
}