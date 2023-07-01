import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Material} from '../models/material';
import {LoginService} from "./NovoLogin.service";

@Injectable({
    providedIn: 'root'
})
export class MaterialService {

    baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient, private service: LoginService) {
    }


    buscarMateriais(): Observable<Material[]> {
        const url = this.baseUrl + '/materiais';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.get<Material[]>(url, {headers});
    }


    create(material: Material): Observable<Material> {
        const url = this.baseUrl + '/materiais';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.post<Material>(url, material, {headers})
    }

    delet(id: any): Observable<Material> {
        const url = this.baseUrl + '/materiais/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.delete<Material>(url, {headers});
    }

    findById(id: any): Observable<Material> {
        const url = this.baseUrl + '/materiais/' + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getTokenDoLocalStorage());
        return this.http.get<Material>(url, {headers});
    }
}
