import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private global:GlobalService,private router:Router) {}
  
  logout(){
    localStorage.removeItem('user');
    this.global.clearTab()
    this.router.navigate(['login'])
   }
}
