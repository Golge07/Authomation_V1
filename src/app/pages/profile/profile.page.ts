import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  show = "profile" 
  constructor(private global: GlobalService, private alert: AlertService, private userService: UserService) { }
  ngOnInit() {
    this.global.menuName = "Profile Page"
  }
  updateName() {
    this.alert.Alert2("Update Name", "", "", [
      {
        text: "Ok",
        role: "ok",
        handler: (res) => {
          const body = {
            id: this.global.user.id,
            name: res.name,
            email: null,
            password: null,
            permission: null
          }
          this.userService.update(body).subscribe(res => {
            if (res["durumKodu"] == "900") {
              this.global.user.name = body.name
              localStorage.setItem('user',JSON.stringify(this.global.user))
              this.alert.Alert('WARNING!','','Name succesfully to updated',["Ok"],"")
            }else{
              this.alert.Alert('WARNING!','','Name failed to update',["Ok"],"")
            }
          })
        }
      }, {

      }],
      [{ name: "name", placeholder: "enter new name" }], "")
  }
  updatePass() {
    this.alert.Alert2("Update Password", "", "", [
      {
        text: "Ok",
        role: "ok",
        handler: (res) => {
          const body = {
            id: this.global.user.id,
            name: null,
            email: null,
            password: res.name,
            permission: null
          }
          this.userService.update(body).subscribe(res => {
            if (res["durumKodu"] == "900") {
              this.global.user.name = body.name
              localStorage.setItem('user',JSON.stringify(this.global.user))
              this.alert.Alert('WARNING!','','Name succesfully to updated',["Ok"],"")
            }else{
              this.alert.Alert('WARNING!','','Name failed to update',["Ok"],"")
            }
          })
        }
      }, {

      }],
      [{ name: "name", placeholder: "enter new password" }], "")
  }
}

