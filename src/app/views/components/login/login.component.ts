import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
        //this.service.removeToken();
        this.service.gerarToken(this.user, this.senha).then((res: boolean) => {
            if (res) {
     
                this.router.navigate(["/home"])
            } else {
                this.erro=true;
     
            }
        });


    }


}
