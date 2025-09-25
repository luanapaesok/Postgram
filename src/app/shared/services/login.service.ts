import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly urlAPI = "http://localhost:3000/auth/login";
  httpClient = inject(HttpClient);

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.urlAPI, { email, password }).pipe(
      tap((resposta) => {
        // Verifica se o token foi recebido
        if (!resposta.accessToken || !this.isBrowser()) return;

        // Armazenando o token no localStorage
        localStorage.setItem('token', btoa(JSON.stringify(resposta.accessToken)));
      })
    );
  }

  logado() {
    return this.isBrowser() && localStorage.getItem('token') ? true : false;
  }
}
