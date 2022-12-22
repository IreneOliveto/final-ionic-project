import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() {}

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
