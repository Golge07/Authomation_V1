
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/http/user.service';
import { ShelfService } from 'src/app/services/http/shelf.service';
@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.page.html',
  styleUrls: ['./addpage.page.scss']
})
export class AddpagePage implements OnInit {
  show = "shelf"
  constructor(private global: GlobalService, private alert: AlertService, private userService: UserService, private shelfService: ShelfService) { }
  ngOnInit() {
    this.global.menuName = "Add Page"
  }
  addItem(name, type, comment, quantity, number) {
    try {
      if (quantity == null || quantity == undefined || quantity.trim() == "") {
        quantity = "Empty";
      }
      const body = { name, type, comment, quantity, number }
      this.shelfService.store(body).subscribe((res) => {
        if (res['durumKodu'] == 900) {
          this.alert.Alert('WARNING!', '', 'Item succesfully to added!', ['Ok'], '')
        } else {
          this.alert.Alert('WARNING!', '', 'Item failed to add!', ['Ok'], '')
        }
      })
    }
    catch (error) {
      this.alert.Alert('HATA!', '', 'Kayıt eklenirken bir sorun oluştu!', ['Tamam'], '')
    }
  }
  addUser(name, email, password, permission) {
    if (permission < this.global.user.permission) {
      const body = { name, email, password, permission }
      this.userService.store(body).subscribe((res) => {
        if (res['durumKodu'] == 900) {
          this.alert.Alert('WARNING!', '', 'User succesfully to added!', ['Ok'], '')
        } else {
          this.alert.Alert('WARNING!', '', 'User failed to add!', ['Ok'], '')
        }
      })
    } else {
      
      this.alert.Alert("WARNING!","","You can't add permission larger than own permission",['Ok'],"")
    }
  }
}