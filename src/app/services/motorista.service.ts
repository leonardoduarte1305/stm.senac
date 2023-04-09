import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Motorista } from '../models/motorista';


@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  baseUrl: String = "http://localhost:8080";

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }


  findAll(): Observable<Motorista[]> {
    const url = this.baseUrl + '/motoristas'
    return this.http.get<Motorista[]>(url);
  }
  findById(id: any): Observable<Motorista> {
    const url = this.baseUrl + '/motoristas/' + id;
    return this.http.get<Motorista>(url);
  }

  update(motorista: Motorista): Observable<Motorista> {
    const url = this.baseUrl + '/motoristas/' + motorista.id;
    return this.http.put<Motorista>(url, motorista)
  }

  create(motorista: Motorista): Observable<Motorista> {
    const url = this.baseUrl + '/motoristas';
    return this.http.post<Motorista>(url, motorista);
  }
  delet(id: any): Observable<Motorista> {
    const url = this.baseUrl + '/motoristas/' + id;
    return this.http.delete<Motorista>(url);
  }
  message(msg: String): void {

    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,

    })
  }
}
