import { SocialLoginModule, SocialUser, SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-buttons',
  standalone: true,
  imports: [CommonModule , SocialLoginModule],
  templateUrl: './login-buttons.component.html',
  styleUrl: './login-buttons.component.scss',
})
export class LoginButtonsComponent {
  linkedInCredentials = {
    clientId: '865ozsdzgfntvy',
    redirectUrl: 'https://social-login-ashen.vercel.app',
    scope: 'r_liteprofile%20r_emailaddress%20w_member_social', // To read basic user profile data and email
  }
  loginForm!: FormGroup
  socialUser!: SocialUser
  isLoggedin?: boolean = undefined
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router:Router
  ) {
    console.log(this.isLoggedin)
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user , "userrr")
      localStorage.setItem('user:session' , JSON.stringify(user))
      if(user){
        this.router.navigateByUrl('/user-details')
      }
      this.socialUser = user
      this.isLoggedin = user != null
    })

    // gapi.load('auth2', () => {
    //   gapi.auth2.init({
    //     client_id: '745628972767-6hdrglvtjp8fi8ohq9m2qqkjv4r7st4q.apps.googleusercontent.com',
    //   });
    // });
  }

  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID).then(()=>{
        this.router.navigateByUrl('/user-details')
        location.reload()
      })
     
    
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res, ' this.socialAuthService this.socialAuthService')
      })
  }
  signOut(): void {
    this.socialAuthService.signOut()
  }

  logOut(): void {
    this.socialAuthService.signOut()
  }
}
