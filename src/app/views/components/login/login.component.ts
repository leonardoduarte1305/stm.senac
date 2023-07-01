import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/NovoLogin.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    erro!: boolean;
    user = '';
    senha = '';

    constructor(
        private router: Router,
        private service: LoginService) {
    }

    async enter() {
        this.service.fazerLoginEArmazenarToken(this.user, this.senha);
        if (this.service.getTokenDoLocalStorage()) {
            this.router.navigate(['/home']);
        } else {
            this.erro = true;
        }
    }


}
