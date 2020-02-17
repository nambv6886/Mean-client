import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isSubmited = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  message = '';
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {}

  doLogin() {
    this.isSubmited = true;
    if(this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res.status === 200) {
        this.isLoading = false;
        this.router.navigate(['management']);
      } else {
        this.isLoading = false;
        this.message = res.message;
      }
    });
  }

}
