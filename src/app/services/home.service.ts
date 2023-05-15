import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home } from '../models/home';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl: String = "";

  exclusao: boolean = false;

  constructor(private http: HttpClient,
    public diaLog: MatDialog) { }

  findAll(): Observable<Home[]> {
    const url = this.baseUrl + "/viagens";
    return this.http.get<Home[]>(url);
  }


}
