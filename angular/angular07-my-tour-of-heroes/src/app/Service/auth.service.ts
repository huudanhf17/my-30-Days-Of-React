import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get currentUser() {
    return of(null);
  }

  constructor() {}
}
