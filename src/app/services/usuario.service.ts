import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    baseUrl: String = "http://localhost:8080";

    constructor(private http: HttpClient, private service: LoginService) {
    }


    create(usuario: Usuario): Observable<Usuario> {
        const url = this.baseUrl + '/usuarios';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<Usuario>(url, usuario, {headers});

    }
}
