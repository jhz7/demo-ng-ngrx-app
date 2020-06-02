import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '@demo-app/data-models';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../+state/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(state => state.auth.user),
      map((user: User) => {
        if(!user) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        return true;
      })
    );
  }
  
}
