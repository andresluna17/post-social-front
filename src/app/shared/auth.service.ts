import { Inject, Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.apiUrl;
  currentUser = {};
  localStorage;
  constructor(
    private http: HttpClient,
    public router: Router,
    @Inject(DOCUMENT) document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }
  // Sign-up
  signUp(user: User) {
    let api = `${this.endpoint}/auth/register`;
    return this.http
      .post(api, user)
      .pipe(catchError(this.handleError))
      .subscribe((res: any) => {
        this.localStorage?.setItem('access_token', res.access_token);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user']);
        });
      });
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/login`, user)
      .subscribe((res: any) => {
        this.localStorage?.setItem('access_token', res.access_token);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user']);
        });
      });
  }
  getToken() {
    return this.localStorage?.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = this.localStorage?.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = this.localStorage?.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/user`;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
