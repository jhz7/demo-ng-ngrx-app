import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authenticate, User } from '@demo-app/data-models';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath = 'http://localhost:3000/login';

  private userSubject$ = new BehaviorSubject<User>(null);

  user$ = this.userSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    const user = localStorage.getItem('user');

    if(user) this.userSubject$.next(JSON.parse(user));
  }

  login(authenticate: Authenticate): Observable<User> {
    return this.httpClient.post<User>(this.loginPath, authenticate).pipe(
      tap((user: User) => {
        this.userSubject$.next(user);
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject$.next(undefined);
    this.userSubject$.complete();
  }
}
