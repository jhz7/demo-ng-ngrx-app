import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Authenticate } from '@demo-app/data-models';
import { Store } from '@ngrx/store';
import { AuthState } from '../../+state/auth.reducer';
import { Login } from '../../+state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
  }

  login(authenticate: Authenticate): void {
    console.log(authenticate);
    this.store.dispatch(new Login(authenticate));
  }

}
