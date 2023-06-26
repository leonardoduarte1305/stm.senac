import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private service: LoginService
  ) {

  }
  erro!: boolean;
  //
  user = '';
  senha = '';
  enter() {


    this.service.gerarToken();
    this.service.getToken();
  }



}
