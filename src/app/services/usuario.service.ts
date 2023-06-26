import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: String = "http://localhost:8080";

  constructor(private http: HttpClient) { }



  create(usuario: Usuario): Observable<Usuario> {
    const url = this.baseUrl + '/usuarios';
    return this.http.post<Usuario>(url, usuario);

  }
}
