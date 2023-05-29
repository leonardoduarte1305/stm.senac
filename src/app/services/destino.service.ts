import { Injectable } from '@angular/core';
import { Destino } from '../models/destino';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  buscarDestinoPorIdViagem(id: any): Observable<Destino> {
    const url = this.baseUrl + "/viagens/"+id+"/destinos";
    return this.http.get<Destino>(url)
  }
}
