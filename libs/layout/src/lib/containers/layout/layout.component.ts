import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@demo-app/data-models';
import { AuthState, getUser } from '@demo-app/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
  }

  onLogout(): void {
    /* this.authService.logout();
    this.router.navigate(['/auth/login']); */
  }

}
