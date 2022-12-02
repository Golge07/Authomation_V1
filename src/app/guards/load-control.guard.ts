import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlHandlingStrategy, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service'
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoadControlGuard implements CanActivate {
  constructor(private router: Router, private global: GlobalService, private alert: AlertService) { }
  user = JSON.parse(localStorage.getItem('user'));
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let header = route.routeConfig.path
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (header == 'login' || header == 'register') {
      if (user != null || user != undefined){
        this.alert.Alert('WARNING!','If you want loguot','You alerdy logined',['Ok'],'')
        this.global.user = JSON.parse(localStorage.getItem('user'))
        this.router.navigate(['/index'])
      }
      else {
        this.global.clearTab()  
         this.global.closeTab()
      }
    } else { 
      if (user != undefined || user != null) {
        this.global.loadtab()
        if (header == 'users' && Number.parseInt(user.permission) < 3) {
          this.alert.Alert('WARNING!', '', 'You dont have permission for this page', ['Ok'], '')
          this.router.navigate(['/index'])
        } else if (header == 'adds' && Number.parseInt(user.permission) < 4) {
          this.alert.Alert('WARNING!', '', 'You dont have permission for this page', ['Ok'], '')
          this.router.navigate(['/index'])
        } else if (header == 'shelf' && Number.parseInt(user.permission) < 2) {
          this.alert.Alert('WARNING!', '', 'You dont have permission for this page', ['Ok'], '')
          this.router.navigate(['/index'])
        } else if(header.trim() == "adds" && Number.parseInt(user.permission) <5){
          this.alert.Alert('WARNING!', '', 'You dont have permission for this page', ['Ok'], '')
          this.router.navigate(['/index'])
        }
      } else {
        this.alert.Alert('WARNING!','','Please login',['Ok'],'')
        this.router.navigate(['/login'])
      }
    }
    return true
  }

}