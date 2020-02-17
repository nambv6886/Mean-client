import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { forbiddenNameValidator, MustMatch } from '../../shared/custome-validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  message = '';
  isSuccess = false;
  isLoading = false;

  constructor(

    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, forbiddenNameValidator, Validators.minLength(3), Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,50}$/)
      ]
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }

  doRegister() {
    this.isLoading = true;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(res => {
      if (res.status === 201) {
        this.isSuccess = true;
      }
      this.message = res.message;
      this.isLoading = false;
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
