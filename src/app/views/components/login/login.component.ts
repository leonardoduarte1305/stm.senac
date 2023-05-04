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
  erro!: boolean ;
  //
  user ='';
  senha ='';
  enter() {
    console.log(this.user +" "+this.senha)
    if (this.user === 'admin' && this.senha === 'admin') {
      this.router.navigate(['/home']);
    } else {
      this.erro = true;

    }
  }



}
