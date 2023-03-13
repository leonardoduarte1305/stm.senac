import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from '../models/home';
import {Observable}from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

baseUrl: String="";



  constructor(private http: HttpClient) { }

  findAll():Observable<Home[]>{
    const url = this.baseUrl + "/viagens";
    return this.http.get<Home[]>(url);
  }
}
