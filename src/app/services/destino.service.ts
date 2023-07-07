import {Injectable} from '@angular/core';
import {Destino} from '../models/destino';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RespostaHttp} from '../models/Interface.Destino';
import {Confirmacao} from '../models/confirmacao';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class DestinoService {
    baseUrl: String = "http://localhost:8080";

    constructor(private http: HttpClient,
                private service: LoginService) {
    }


    create(destino: Destino): Observable<Destino> {
        const url = this.baseUrl + "/destinos";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.post<Destino>(url, destino, {headers})
    }

    buscarDestinoPorIdViagem(id: any): Observable<RespostaHttp> {
        const url = this.baseUrl + "/viagens/" + id + "/destinos";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<RespostaHttp>(url, {headers})
    }

    buscarDestinoPorId(id: any): Observable<RespostaHttp> {
        const url = this.baseUrl + "/destinos/" + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.get<RespostaHttp>(url, {headers})
    }

    delet(id: any): Observable<Destino> {
        const url = this.baseUrl + '/destinos/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.delete<Destino>(url, {headers});
    }

    confirmarDestino(id: any, confirmacao: Confirmacao): Observable<Confirmacao> {
        const url = "http://localhost:8080/destinos/" + id + "/confirmacao";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        console.log(confirmacao)
        return this.http.post<Confirmacao>(url, confirmacao, {headers});
    }
    desconfirmarDestino(id: any, confirmacao: Confirmacao): Observable<Confirmacao> {
        const url = "http://localhost:8080/destinos/" + id + "/confirmacao";
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        console.log(confirmacao)
        return this.http.post<Confirmacao>(url, confirmacao, {headers});
    }

    update(destino: Destino): Observable<Destino> {
        const url = this.baseUrl + '/destinos/' + destino.id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        return this.http.put<Destino>(url, destino, {headers});
    }

}
