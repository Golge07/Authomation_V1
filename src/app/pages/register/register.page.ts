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
  constructor(private global: GlobalService, private formBuilder: FormBuilder, private http: UserService, private router: Router, private alert: AlertService) { }
  RegisterForm: FormGroup;
  errorMessages = {
    name: [
      {
        type: 'required', message: "Name can't be blank"
      },
      {
        type: 'minlength', message: 'Name can be min 4 charecter'
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
    ]
  }
  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      username: new FormControl("", [Validators.minLength(3), Validators.required, Validators.maxLength(10)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    })
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
  get f() { return this.RegisterForm.controls; }
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
}