import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<string | null>(localStorage.getItem('user'));

  login(username: string, password: string): boolean {
    const ok = (username === 'admin' && password === 'admin123');
    if (ok) {
      this._user.set(username);
      localStorage.setItem('user', username);
    }
    return ok;
  }
  isLoggedIn(): boolean { return !!this._user(); }
  currentUser(): string | null { return this._user(); }
  logout() {
    this._user.set(null);
    localStorage.removeItem('user');
  }
}
