// auth.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  private baseUrl = 'https://git-auth-b4j9.onrender.com' // Replace with your backend URL

  constructor(private http: HttpClient) {}

  githubLogin(returnUrl: string): Observable<any> {
    // Include the returnUrl parameter in the GitHub login URL
    const loginUrl = `${this.baseUrl}/auth/github?returnUrl=${returnUrl}`
    return this.http.get(loginUrl)
  }

  githubCallback(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/github/callback`)
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gitAccountData`)
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`)
  }
}
