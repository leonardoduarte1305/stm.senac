import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setor } from '../models/setor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl: String = "http://localhost:8080";

  findAll(): Observable<Setor[]> {
    const url = this.baseUrl + '/setores';
    return this.http.get<Setor[]>(url);

  }
}
