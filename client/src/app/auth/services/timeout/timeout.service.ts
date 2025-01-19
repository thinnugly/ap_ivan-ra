import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimeoutService {
  private timeoutId: any;
  private readonly timeoutDuration = 15 * 60 * 1000; // 15 minutos

  constructor(private router: Router, private ngZone: NgZone) {}

  startMonitoring() {
    this.resetTimer();
    ['click', 'mousemove', 'keypress', 'scroll'].forEach((event) => {
      window.addEventListener(event, this.resetTimer.bind(this));
    });
  }

  stopMonitoring() {
    this.clearTimer();
    ['click', 'mousemove', 'keypress', 'scroll'].forEach((event) => {
      window.removeEventListener(event, this.resetTimer.bind(this));
    });
  }

  private resetTimer() {
    this.clearTimer();
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.logout();
      });
    }, this.timeoutDuration);
  }

  private clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private logout() {
    // Limpa os dados de autenticação e redireciona para a página de login
    StorageService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
