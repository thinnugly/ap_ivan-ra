import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../app/auth/services/storage/storage.service';

export const adminauthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = StorageService.getToken();
    const role = StorageService.getUserRole();

    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }

    if (role !== 'ADMIN') {
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
};
