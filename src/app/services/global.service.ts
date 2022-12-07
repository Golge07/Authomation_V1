import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { Md5 } from 'ts-md5'
import { Router } from '@angular/router';
import { UserControlGuard } from '../guards/user-control.guard';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private formBuilder: FormBuilder,private router: Router, private alerts: AlertService,private userControl:UserControlGuard) { }
  showmenu: boolean = false;
  menuName
  user = JSON.parse(localStorage.getItem('user'))
  loadtab() {
    this.showmenu = false
    let s2: number = Number(JSON.parse(localStorage.getItem('user'))==null? 0:JSON.parse(localStorage.getItem('user')).permission)
    if(this.tabs.length < 1){
    for (let index = 0; index < this.dummytabs.length; index++) {
      let s1: number = Number(this.dummytabs[index].authority)
      if(index <2){
        this.tabs.push(this.dummytabs[index])
      }
      else if (s1 <= s2) {
        this.tabs.push(this.dummytabs[index])
      }
    }
    }    
  }
  clearTab(){
this.tabs = []
  }
  closeTab(){
this.showmenu= true
  }
  tabtest() {
    if (this.tabs.length == 0) {
      this.loadtab()
    }
  }
  t: Function = () => { }
  
  dummytabs = [
  { icon: 'person', title: '  Profile', url: 'profile', authority: 0, id: 0,handler:()=>{this.userControl.testUser()}} ,
  { icon: 'grid', title: '  Shelfs', url: 'index', authority: 0, id: 1 ,handler:()=>{this.userControl.testUser()}},
  { icon: 'people', title: '  Users', url: '/users', authority: 2, id: 2,handler:()=>{this.userControl.testUser()}},
  { icon: 'add-circle', title: 'Add', url: '/adds', authority: 3, id: 3,handler:()=>{this.userControl.testUser()}},
  { icon: 'log-out-outline', title: 'Logout', url: '/login', authority: 0, id: 4 ,handler:()=>{ localStorage.removeItem('user')}}]
   tabs =[]
   errMessages = {
    name: [
      {
        type: 'required', message: "Name can't be blank"
      },
      {
        type: 'minlength', message: 'Name can be min 3 charecter'
      },
      {
        type: 'maxlength', message: 'Name can be max 10 charecter'
      }
    ],
    email: [
      {
        type: 'required', message: "Email can't be blank"
      }, {
        type: 'email', message: 'Please enter a valid email'
      }
    ],
    password: [
      {
        type: 'required', message: "Password can't be blank"
      }, {
        type: 'minlength', message: 'Password can be min 4 charecter'
      }, {
        type: 'maxlength', message: 'Password can be max 8 charecter'
      }
    ],
    confirmPassword: [
      {
        type: 'required', message: "Re-password can't be blank"
      }, {
        type: 'mustMatch', message: 'Re-password must be the same as the password'
      }
    ],
    perm: [
      {
        type: 'required', message: "Re-password can't be blank"
      }, {
        type: 'az', message: "The user's permission cannot exceed yours!"
      }
    ]
  }
  formGroup = this.formBuilder.group({
    username: new FormControl("", [Validators.minLength(3), Validators.required, Validators.maxLength(10)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  })
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
 
  get f() { return this.formGroup.controls; }
}