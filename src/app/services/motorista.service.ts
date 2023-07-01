import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Motorista} from '../models/motorista';
import {LoginService} from "./NovoLogin.service";


@Injectable({
    providedIn: 'root'
})
export class MotoristaService {

    baseUrl: String = "http://localhost:8080";

    constructor(private http: HttpClient, private service: LoginService,
                private snack: MatSnackBar) {
    }


    findAll(): Observable<Motorista[]> {
        const url = this.baseUrl + '/motoristas';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.get<Motorista[]>(url, {headers});
    }

    findById(id: any): Observable<Motorista> {
        const url = this.baseUrl + '/motoristas/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.get<Motorista>(url, {headers});
    }

    update(motorista: Motorista): Observable<Motorista> {
        const url = this.baseUrl + '/motoristas/' + motorista.id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.put<Motorista>(url, motorista, {headers})
    }

    create(motorista: Motorista): Observable<Motorista> {
        const url = this.baseUrl + '/motoristas';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.post<Motorista>(url, motorista, {headers});
    }

    delet(id: any): Observable<Motorista> {
        const url = this.baseUrl + '/motoristas/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.delete<Motorista>(url, {headers});
    }

    message(msg: String): void {

        this.snack.open(`${msg}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000

        })
    }
}
