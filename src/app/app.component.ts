import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var google:any;
declare const gapi: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , SocialLoginModule],
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

    // gapi.load('auth2', () => {
    //   gapi.auth2.init({
    //     client_id: '745628972767-6hdrglvtjp8fi8ohq9m2qqkjv4r7st4q.apps.googleusercontent.com',
    //   });
    // });
  }

  
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
      console.log("res")
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
      console.log( res,' this.socialAuthService this.socialAuthService')
    });
    
}
  signOut(): void {
    this.socialAuthService.signOut();
  }



logOut(): void {
    this.socialAuthService.signOut();
}
}
