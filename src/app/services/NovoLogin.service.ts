import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private tokenKey = 'access_token';

    constructor(
        private router: Router,
        private http: HttpClient) {
    }

    login(): boolean {
        this.router.navigate(['/']);
        return true
    }

    async fazerLoginEArmazenarToken(user: string, senha: string) {
        const body = {
            grant_type: 'password',
            client_id: 'api-transportes-client',
            username: user,
            password: senha
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const url = 'http://127.0.0.1:8081/realms/master/protocol/openid-connect/token';

        const resposta = await this.http.post(url, this.transformRequestParams(body), {headers})
            .subscribe(response => {
            return response;
        });
        // @ts-ignore
        this.storeToken(resposta["access_token"]);
    }

    storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getTokenDoLocalStorage(): string {
        return localStorage.getItem(this.tokenKey)!;
    }

    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    private transformRequestParams(params: any): string {
        const formBody: string[] = [];
        for (const property in params) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }

    getHeaderAuthorization(){
        return new HttpHeaders().set('Authorization', 'Bearer ' + this.getTokenDoLocalStorage());
    }
}
