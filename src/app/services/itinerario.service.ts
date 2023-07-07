import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Itinerario} from '../models/itinerario';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Viagem} from '../models/viagem';
import {Confirmacao} from '../models/confirmacao';
import {EncerrarViagem} from '../models/encerrarViagem';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class ItinerarioService {

    baseUrl: String = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private snack: MatSnackBar,
        private service: LoginService
    ) {
    }

    mensagem(msg: String) {
        this.snack.open(`${msg}`, 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 2000
            }
        )
    }

    findById(id: any): Observable<Viagem> {
        const url = this.baseUrl + '/viagens/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<Viagem>(url, {headers});
    }

    findAll(): Observable<Itinerario[]> {
        const url = this.baseUrl + '/viagens'
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<Itinerario[]>(url, {headers});
    }

    delet(id: any): Observable<Itinerario> {
        const url = this.baseUrl + '/viagens/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.delete<Itinerario>(url, {headers});
    }

    create(viagem: Viagem): Observable<Viagem> {
        const url = this.baseUrl + "/viagens";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<Viagem>(url, viagem, {headers})
    }

    status(id: any, confirmacao: Confirmacao): Observable<Confirmacao> {
        const url = "http://localhost:8080/viagens/" + id + "/confirmacao";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        console.log(confirmacao)
        return this.http.post<Confirmacao>(url, confirmacao, {headers});
    }

    encerrarViagem(id: any, encerrado: EncerrarViagem): Observable<EncerrarViagem> {
        const url = "http://localhost:8080/viagens/" + id + "/encerramento";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        console.log(encerrado)
        return this.http.post<EncerrarViagem>(url, encerrado, {headers});
    }


    update(viagem: Viagem): Observable<Viagem> {
        const url = this.baseUrl + '/viagens/' + viagem.id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.put<Viagem>(url, viagem, {headers});
    }
}
