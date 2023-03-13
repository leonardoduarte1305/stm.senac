import { Injectable } from '@angular/core';
import { Veiculo } from '../models/veiculo';
import {Observable}from'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
//Colocar url base
  baseUrl:String= "";

  constructor(private http:HttpClient) { }
findAll():Observable<Veiculo[]>{
const url = this.baseUrl + '/veiculos';
return this.http.get<Veiculo[]>(url);
}

}
