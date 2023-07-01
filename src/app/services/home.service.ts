import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Home} from '../models/home';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from "./NovoLogin.service";


@Injectable({
    providedIn: 'root'
})
export class HomeService {

    baseUrl: String = "";

    exclusao: boolean = false;

    constructor(private http: HttpClient,
                public diaLog: MatDialog,
                private service: LoginService) {
    }

    findAll(): Observable<Home[]> {
        const url = this.baseUrl + "/viagens";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.get<Home[]>(url, {headers});
    }


}
