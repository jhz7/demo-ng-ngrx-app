import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AuthActionTypes, Login, LoginSuccess, LoginFail } from './auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { User } from '@demo-app/data-models';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((action: Login) =>
      this.authService
      .login(action.payload).pipe(
        map((user: User) => new LoginSuccess(user)),
        catchError(error => of(new LoginFail(error)))
      )
    )
  );

  @Effect({dispatch: false})
  navigateToProfile$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => action.payload),
    tap(() => this.router.navigate(['/products']))
  )

  constructor(
    private actions$: Actions, 
    private authService: AuthService,
    private router: Router
  ) {}
}
