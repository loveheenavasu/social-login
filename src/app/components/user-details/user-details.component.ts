import { SocialLoginService } from './../../social-login.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  public userDetails: any
  public isGitAccountData: boolean = false
  public gitData: any
  public isGitSignIn: any
  constructor(
    private router: Router,
    private socialLoginService: SocialLoginService,
  ) {}

  ngOnInit(): void {
    this.loadUserDetails()
    this.getGitData()
    this.loadGitLoginSession()
  }

  private loadUserDetails(): void {
    const storedUserData = localStorage.getItem('user:session')
    if (storedUserData) {
      this.userDetails = JSON.parse(storedUserData)
    }
  }

  private loadGitLoginSession(): void {
    const isGitSignInString = localStorage.getItem('isGitSignIn')
    this.isGitSignIn = Boolean(isGitSignInString)
    console.log(this.isGitSignIn)
  }

  public signout(): void {
    this.userDetails = ''
    localStorage.clear()
    this.router.navigate(['/'])
  }

  public getGitData() {
    this.socialLoginService.getProfile().subscribe({
      next: (res) => {
        this.isGitAccountData = true
        this.gitData = res
        console.log(res)
      },
    })
  }
}
