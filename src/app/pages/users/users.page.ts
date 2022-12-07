import { Component, OnInit } from '@angular/core';  
import { ModalController } from '@ionic/angular';
import { UsermodalComponent } from 'src/app/components/usermodal/usermodal.component';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';
import { SearchService } from 'src/app/services/http/search.service';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  constructor(private searchService:SearchService,private userService:UserService,private global: GlobalService, private alert: AlertService, private modalctrl: ModalController) { }
  ngOnInit() {  
    this.userService.show(this.global.user['permission']).subscribe((res) => { this.users = res['data']; })
    this.global.menuName = "Users Page"
  }
errMessages = this.global.errMessages
  async openmodal(name, dust2, password, perm, id) {
    const a: string = dust2
    const modal = await this.modalctrl.create({ component: UsermodalComponent, componentProps: { id,name, dust2, password, perm,refresh: ()=>{this.search(this.v)}} })
    return modal.present()
  }
  users = []
  selects = [
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'Name',
    },
    {
      id: 2,
      name: 'Email',
    },
    {
      id: 3,
      name: 'Permission',
    }
  ];
  v
  select;
  search(value) {
    this.v = value
    if (value != "" && value != undefined) {
      if (this.select == undefined) {
        const body = {type:'Global',"value": this.v, per:this.global.user['permission']}
        this.searchService.searchUser(body).subscribe((res) => { this.users = res['data'];})
      }
      else {
        const body = { "type":this.select.trim() == "All" ? "Global": this.select,"value":value,per:this.global.user['permission']}
        this.searchService.searchUser(body).subscribe((res) => {
          this.users = res['data']
        },(er)=>{this.alert.Alert('WARNING','','There is a problem',['Ok'],'')})
      }
    }
    else {
      this.userService.show(this.global.user['permission']).subscribe((res) => {
        this.users = res['data'];
      },(res)=>{this.alert.Alert('WARNING','','There is a problem',['Ok'],'')})
    }
  }
  handleChange(ev) {
    this.select = ev.target.value;
  }
}
