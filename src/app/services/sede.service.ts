import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  baseUrl: String = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }
  findAll(): Observable<Sede[]> {
    const url = this.baseUrl + '/sedes';
    return this.http.get<Sede[]>(url);
  
  }
}
