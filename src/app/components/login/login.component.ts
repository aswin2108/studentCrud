import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginForm } from 'src/app/interfaces/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup ;
  constructor(private fb: FormBuilder){}
  ngOnInit(){

  this.loginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })as FormGroup & LoginForm;
}
}
