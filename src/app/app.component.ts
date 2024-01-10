import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare const google: any;
declare const gapi: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SocialLoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
    console.log(this.isLoggedin);
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log('res');
      });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  

  // loginWithGoogle(): void {
    // gapi.auth2
    //   .getAuthInstance()
    //   .signIn()
    //   .then(
    //     (googleUser: any) => {
    //       // Handle successful sign-in
    //       const idToken = googleUser.getAuthResponse().id_token;
    //       console.log('Google User:', googleUser);
    //     },
    //     (error: any) => {
    //       // Handle sign-in error
    //       console.error('Error during Google Sign-In', error);
    //     }
    //   );
  // }


  signOut(): void {
    this.socialAuthService.signOut();
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }



}
