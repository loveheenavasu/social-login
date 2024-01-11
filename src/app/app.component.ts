import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login'
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
declare var google: any
declare const gapi: any

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
