import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  public userDetails:any
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user:session') as string);
    console.log(this.userDetails , "userDetails")
  }

}
