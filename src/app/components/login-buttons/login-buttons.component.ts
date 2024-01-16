import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login'
import { SocialLoginService } from '../../social-login.service'

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.scss'],
})
export class LoginButtonsComponent implements OnInit {
  // LinkedIn credentials for social login
  linkedInCredentials = {
    clientId: '865ozsdzgfntvy',
    redirectUrl: 'https://social-login-ashen.vercel.app',
    scope: 'r_liteprofile%20r_emailaddress%20w_member_social',
  }

  // Form group for login form
  loginForm!: FormGroup
  // Social user details
  socialUser!: any
  // Flag indicating whether the user is logged in
  isLoggedin?: boolean = undefined
  isGitSignIn: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService,
    public socialLoginService: SocialLoginService,
  ) {}

  ngOnInit(): void {
    // Initialize the login form
    this.initializeLoginForm()
    // Subscribe to changes in authentication state
    this.subscribeToAuthState()
  }

  // Initialize the login form with validation
  private initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  // Subscribe to changes in authentication state
  private subscribeToAuthState(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.handleAuthState(user)
    })
  }

  // Handle changes in authentication state
  private handleAuthState(user: SocialUser | null): void {
    console.log(user, 'userrr')
    if (user) {
      // Handle actions when the user is authenticated
      this.handleAuthenticatedUser(user)
    }
    this.socialUser = user
    this.isLoggedin = user !== null
  }

  // Handle actions when the user is authenticated
  private handleAuthenticatedUser(user: SocialUser): void {
    // Store user session in local storage
    localStorage.setItem('user:session', JSON.stringify(user))
    // Navigate to user details page
    this.navigateToUserDetails()
  }

  // Trigger Auth0 authentication
  authO(): void {
    this.authService.loginWithRedirect()
  }

  // Sign in with Facebook
  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.navigateToUserDetails()
      })
  }

  // Sign in with Google
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      console.log('Logged in successfully...')
    })
  }

  // Login with Google
  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res, ' this.socialAuthService this.socialAuthService')
      })
  }

  // Sign in with GitHub
  signInWithGit(): void {
    this.isGitSignIn = true
    if (this.isGitSignIn) {
      localStorage.setItem('isGitSignIn', 'true')
    } else {
      localStorage.setItem('isGitSignIn', 'false')
    }

    // Implement GitHub login logic here
  }

  // Sign out the user
  signOut(): void {
    this.socialAuthService.signOut()
  }

  // Log out the user
  logOut(): void {
    this.socialAuthService.signOut()
  }

  // Navigate to user details page
  private navigateToUserDetails(): void {
    this.router.navigateByUrl('/user-details')
  }
}
