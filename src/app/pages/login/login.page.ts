import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/http/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private userService:UserService, private router: Router, private global: GlobalService, private alert: AlertService) { }
  ngOnInit() {
  }
  trylogin(e, p) {
    /*
    this.http.callUserLogin(e, p).subscribe((res) => {
     
    })*/
    this.userService.checkUser(e,p).subscribe(res=>{
       if (res['durumKodu'] == "900") {
        localStorage.setItem('user', JSON.stringify(res['data'][0]))
        this.alert.Alert('Welcome', 'Welcome again', '', ['Ok'], '')
        this.router.navigate(['index'])
      } else {
        this.alert.Alert('Login Failed!', 'Please check your email or password', '', ['Ok'], '')
      }
    })
  }
}