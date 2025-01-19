import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../app/auth/services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = StorageService.getToken();
  const role = StorageService.getUserRole();

  if (token) {
    if (role === 'EMPLOYEE') {
      router.navigate(['/employee']);
      return false;
    } else if (role === 'ADMIN') {
      router.navigate(['/admin']);
      return false;
    }
  }

  return true;
};
