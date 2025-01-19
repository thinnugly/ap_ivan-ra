import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  if(StorageService.isAdminLoggedIn()){
    router.navigateByUrl('/admin/dashboard');
  }else if(StorageService.isEmployeeLoggedIn()){
    router.navigateByUrl('/employee/dashboard');
  }else {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
