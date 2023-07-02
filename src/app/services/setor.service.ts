import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Setor} from '../models/setor';
import {Observable} from 'rxjs';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class SetorService {

    baseUrl: String = "http://localhost:8080";

    constructor(
        private http: HttpClient, private service: LoginService) {
    }

    findAll(): Observable<Setor[]> {
        const url = this.baseUrl + '/setores';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<Setor[]>(url, {headers});

    }
}
