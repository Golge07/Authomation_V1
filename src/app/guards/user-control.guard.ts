import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/http/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserControlGuard implements CanActivate {
  constructor(private http:UserService,private alert:AlertService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  testUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.http.checkUser(user['email'], user['password']).subscribe((res) => {
      if (res['durumKodu'] != "900") {
        this.alert.Alert('WARNING', '', 'Something went wrong or your account was deleted', ['Ok'], '')
        this.router.navigate(['/login'])
        localStorage.removeItem('user')
      }
      else{
        localStorage.setItem('user', JSON.stringify(res['data'][0]))
      }
    },(er)=>{
      console.log(er);
    })
  }
}
