import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class ViagemService {


    baseUrl: string = "http://127.0.0.1:8080";

    constructor(private http: HttpClient, private service: LoginService) {
    }


    baixarPDF(id: Number) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.service.getToken());
        headers.set('Accept', 'application/pdf');
        return this.http.get(this.baseUrl + "/viagens/" + id + "/exportar", {headers: headers, responseType: 'blob'})
    }
}
