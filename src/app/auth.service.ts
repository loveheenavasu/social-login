// auth.service.ts
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
        issuer: 'https://github.com/login/oauth/authorize',
        // redirectUri: window.location.origin + '/callback',
        clientId: 'e6a8bf2f7c564458a493',
        responseType: 'code',
        scope: 'user',
      };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
