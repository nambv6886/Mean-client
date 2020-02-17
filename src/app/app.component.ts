import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // isLogin = false;
  // this for testing sourcetree
  constructor(
    private route: Router
  ) {}

  isLoginOrRegisterPage() {
    return this.route.url === '/login' || this.route.url === '/register';
  }
  title = 'mean-client';
}
