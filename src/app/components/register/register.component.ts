import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterForm } from 'src/app/interfaces/registerForm';
import { passwordMatchValidator } from 'src/app/shared/password-match.directives';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+([\s][a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatchValidator // Use "validator" for custom validators
    }) as FormGroup & RegisterForm;
  }
}
