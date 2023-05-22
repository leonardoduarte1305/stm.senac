import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }



  buscarMateriais(): Observable<Material[]> {
    const url = this.baseUrl + '/materiais'
    return this.http.get<Material[]>(url);
  }


  create(material: Material): Observable<Material> {
    const url = this.baseUrl + '/materiais'
    return this.http.post<Material>(url, material)
  }
  delet(id: any): Observable<Material> {
    const url = this.baseUrl + '/materiais/' + id;
    return this.http.delete<Material>(url);
  }
  
}
