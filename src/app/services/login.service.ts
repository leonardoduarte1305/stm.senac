import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'access_token';

  constructor(
    private router: Router,
    private http: HttpClient

  ) { }
  login(): boolean {
    this.router.navigate(['/']);
    return true
  }
  resultadoToke: string = "";
  gerarToken() {
    const data = "grant_type=password&client_id=api-transportes-client&username=gabriel&password=gabriel";

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);
        const accessToken = response.access_token;
        localStorage.setItem("token",accessToken);
        console.log("Access Token:", accessToken);

        
      }
    });

    xhr.open("POST", "http://localhost:80/realms/master/protocol/openid-connect/token");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);

  }

  getToke() {
    const url = 'http://localhost:80/realms/master/protocol/openid-connect/token';
    const body = {
      grant_type: 'password',
      client_id: 'api-transportes-client',
      username: 'gabriel',
      password: 'gabriel'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, this.transformRequestParams(body), { headers });
  }

  private transformRequestParams(params: any): string {
    const formBody: string[] = [];
    for (const property in params) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    console.log(formBody)
    return formBody.join('&');
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    alert(localStorage.getItem("token"))
    console.log( )
    return localStorage.getItem("token")!;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }



}
