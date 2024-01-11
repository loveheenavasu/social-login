import { LoginButtonsComponent } from './../login-buttons/login-buttons.component'
import { Routes } from '@angular/router'
import { UserDetailsComponent } from '../user-details/user-details.component'

export const routes: Routes = [
  {
    path: '',
    component: LoginButtonsComponent,
  },
  {
    path:'user-details',
    component:UserDetailsComponent
  }
]
