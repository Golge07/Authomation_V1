import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { GlobalService } from 'src/app/services/global.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/http/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private global: GlobalService, private http: UserService, private router: Router, private alert: AlertService) { }
  RegisterForm: FormGroup;
  f
  errorMessages = this.global.errMessages;
  ngOnInit() {
    this.f = this.global.f;
    this.RegisterForm = this.global.formGroup;
  }
  onSubmit(){
    if (this.RegisterForm.invalid) {
      this.alert.Alert('WARNING!','','Please complete all conditions!',['Ok'],'')
      this.RegisterForm.markAsTouched()
    return;
    }else{
      const body= {
      name:  this.f.username.value,
       email: this.f.email.value,
       password: this.f.password.value,
      permission: 1
      }
      this.http.store(body).subscribe((res)=>{
        if(res["durumKodu"]=="900"){
          this.alert.Alert('WARNING!','','Account successfully to created!',['Ok'],'')
        }else{
          this.alert.Alert('WARNING!','','Account failed to create!',['Ok'],'')
        }
      })
    }
  }
  
 
}