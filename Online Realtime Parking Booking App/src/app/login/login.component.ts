import { Component, OnInit } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods, FirebaseAuthState, AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import {UserService} from '../Services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  sign_in:boolean=false;

  constructor(private route:Router, private _formBuilder:FormBuilder, private us:UserService) {

    this.userForm= this._formBuilder.group({ 
     email:[null,[Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{4,13}$'),Validators.required]],
     password:['',passvalidator]
    })
  }

  ngOnInit() {
  }

  signIn(){
    this.us.loginUser(this.userForm.value);
  }

}

function passvalidator(control: FormControl):{ [s: string] : boolean }{                          // custom validation function for password
   if ( ! control.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/ )){
     return {invalidPassword: true}
   }
 }