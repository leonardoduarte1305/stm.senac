import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede';

@Injectable({
  providedIn: 'root'
})

export class SedeService {

  baseUrl: String = "http://localhost:8080";

  constructor(private http: HttpClient,
    private snack: MatSnackBar) {
  }
  findAll(): Observable<Sede[]> {
    const url = this.baseUrl + '/sedes';
    return this.http.get<Sede[]>(url);

  }
  create(sede: Sede): Observable<Sede> {
    const url = this.baseUrl + '/sedes';
    return this.http.post<Sede>(url, sede);
  }
  findById(id: any): Observable<Sede> {
    const url = this.baseUrl + "/sedes/" + id;
    return this.http.get<Sede>(url);
  }
  update(sede: Sede): Observable<Sede> {
    const url = this.baseUrl + '/sedes/' + sede.id;
    return this.http.put<Sede>(url, sede);
  }

  delet(id: any): Observable<Sede> {
    const url = this.baseUrl + '/sedes/' + id;
    return this.http.delete<Sede>(url)
  }
  inscrever(id: any, email: string[]): Observable<string[]> {
    const url = this.baseUrl + '/sedes/' + id + '/inscrever';
    return this.http.post<string[]>(url, email)
  }
}
