import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="bg-white border-b sticky top-0 z-40" *ngIf="!isLoginPage()">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <a routerLink="/employees" class="font-bold text-lg">Employee Management</a>

        <div class="ml-auto flex items-center gap-2" *ngIf="auth.isLoggedIn()">
          <span class="text-sm text-gray-600">Hi, {{ auth.currentUser() }}</span>
          <button class="px-3 py-1 text-sm border rounded hover:bg-gray-100" (click)="logout()">
            Logout
          </button>
        </div>
      </div>
    </header>

    <main [ngClass]="isLoginPage() ? 'mx-auto h-[100svh] overflow-hidden' : 'max-w-6xl mx-auto px-2 py-4'">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
