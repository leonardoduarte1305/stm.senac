import { Injectable } from '@angular/core';
import { Destino } from '../models/destino';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespostaHttp } from '../models/Interface.Destino';
import { Confirmacao } from '../models/confirmacao';
@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  baseUrl: String = "http://localhost:8080";
  constructor(private http: HttpClient) { }


  create(destino: Destino): Observable<Destino> {
    const url = this.baseUrl + "/destinos";
    return this.http.post<Destino>(url, destino)
  }
  buscarDestinoPorIdViagem(id: any): Observable<RespostaHttp> {
    const url = this.baseUrl + "/viagens/" + id + "/destinos";
    return this.http.get<RespostaHttp>(url)
  }

  delet(id: any): Observable<Destino> {
    const url = this.baseUrl + '/destinos/' + id;
    return this.http.delete<Destino>(url);
  }
  confirmarDestino(id: any, confirmacao: Confirmacao): Observable<Confirmacao> {
    const url = "http://localhost:8080/destinos/" + id + "/confirmacao";
    console.log(confirmacao)
    return this.http.post<Confirmacao>(url, confirmacao);
  }
}
