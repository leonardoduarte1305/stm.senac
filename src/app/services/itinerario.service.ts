import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Itinerario } from '../models/itinerario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viagem } from '../models/viagem';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }
  baseUrl: String = "http://localhost:8080";

  mensagem(msg: String) {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000
    }
    )
  }
  findAll(): Observable<Itinerario[]> {
    const url = this.baseUrl + '/viagens'
    return this.http.get<Itinerario[]>(url);
  }

  delet(id: any): Observable<Itinerario> {
    const url = this.baseUrl + '/viagens/' + id;
    return this.http.delete<Itinerario>(url);
  }
  create(viagem: Viagem): Observable<Viagem> {
    const url = this.baseUrl + "/viagens";
    return this.http.post<Viagem>(url, viagem)
  }
}
