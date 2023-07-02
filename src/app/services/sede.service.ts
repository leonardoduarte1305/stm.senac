import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede';
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
})

export class SedeService {

    baseUrl: String = "http://localhost:8080";

    constructor(private http: HttpClient,
        private snack: MatSnackBar, private service: LoginService) {
    }

    findAll(): Observable<Sede[]> {
        const url = this.baseUrl + '/sedes';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<Sede[]>(url, { headers });

    }

    create(sede: Sede): Observable<Sede> {
        const url = this.baseUrl + '/sedes';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        console.log(headers)
        return this.http.post<Sede>(url, sede, { headers });
    }

    findById(id: any): Observable<Sede> {
        const url = this.baseUrl + "/sedes/" + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<Sede>(url, { headers });
    }

    update(sede: Sede): Observable<Sede> {
        const url = this.baseUrl + '/sedes/' + sede.id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.put<Sede>(url, sede, { headers });
    }

    delet(id: any): Observable<Sede> {
        const url = this.baseUrl + '/sedes/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.delete<Sede>(url, { headers })
    }

    inscrever(id: any, email: string[]): Observable<string[]> {
        const url = this.baseUrl + '/sedes/' + id + '/inscrever';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<string[]>(url, email, { headers })
    }

    desinscrever(id: any, email: string[]): Observable<string[]> {
        const url = this.baseUrl + '/sedes/' + id + '/desinscrever';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<string[]>(url, email, { headers })
    }
}
