import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from "./login.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    baseUrl: String = "http://127.0.0.1:8080";

    constructor(private http: HttpClient, private service: LoginService, private snack: MatSnackBar) {
    }


    create(usuario: Usuario): Observable<Usuario> {
        const url = this.baseUrl + '/usuarios';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<Usuario>(url, usuario, {headers});

    }
    message(msg: String): void {

        this.snack.open(`${msg}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['barr']

        })
    }
}
