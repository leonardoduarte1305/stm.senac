import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {


  baseUrl: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }


  baixarPDF(id:Number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.baseUrl+"/viagens/"+id+"/exportar", { headers: headers, responseType: 'blob' })
  }
}
