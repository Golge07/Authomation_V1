import { Injectable } from '@angular/core';
//import { Md5 } from 'ts-md5'
import { Router } from '@angular/router';
import { UserControlGuard } from '../guards/user-control.guard';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router, private alerts: AlertService,private userControl:UserControlGuard) { }
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
  setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

 setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
 isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
validateInputsRegister = (username,email,password,password2) => {
 let v1 ,v2,v3,v4;
 if(this.checkusername(username)){
v1 = true
 }else{
  v1=false
 }
 if(this.checkemail(email)){
v2=true
 }else{
  v2=false
 }
 if(this.checkpass1(password)){
  v3 = true
 }else{
  v3=false
 }
 if(this.checkpass2(password.value,password2)){
v4=true
 }else{
v4=false
 }
 return v1&&v2&&v3&&v4
};
validateInputsLogin = (email,password) => {
  return this.checkemail(email) &&this.checkpass1(password)
};
checkusername(username){
  const usernameValue= username.value.trim();
  if(usernameValue === '') {
    this.setError(username, 'Username is required');
    return false
}else if(usernameValue.length <2){
  this.setError(username, "Username cannot be less than 2 letters");
  return false
}else if(usernameValue.length >10){
  this.setError(username, "Username cannot be more than 10 letters");
  return false
} else {
  this.setSuccess(username);
  return true
}
};
checkemail(email){
  let emailValue=email.value
  if(emailValue === '') {
    this.setError(email, 'Email is required');
    return false
  } else if (!this.isValidEmail(emailValue)) {
    this.setError(email, 'Provide a valid email address');
    return false
  } else {
    this.setSuccess(email);
    return true
  }
};
checkpass1(password){
  let passwordValue=password.value
  if(passwordValue === '') {
    this.setError(password, 'Password is required');
    return false
  } else if (passwordValue.length < 1 ) {
    this.setError(password, 'Password must be at least 8 character.')
    return false
  } else if (passwordValue.length > 16 ) {
    this.setError(password, "Password  must be a maximum of 16 characters");
    return false
  }else {
    this.setSuccess(password);
    return true
  }
};
checkpass2(passwordValue,password2){
  let password2Value = password2.value
  if(password2Value === '') {
    this.setError(password2, 'Please confirm your password');
    return false
  } else if (password2Value !== passwordValue) {
    this.setError(password2, "Passwords doesn't match");
    return false
  } else {
    this.setSuccess(password2);
    return true
  }
};
}