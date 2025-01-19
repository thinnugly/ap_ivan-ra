import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { employeeauthGuard} from '../guards/employee/employeeauth.guard';
import { adminauthGuard} from '../guards/admin/adminauth.guard';
import { authGuard} from '../guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/components/unauthorized/unauthorized.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: "auth/login", component: LoginComponent, canActivate: [authGuard]},
  { path: "auth/signup", component: SignupComponent },
  { path: "unauthorized", component: UnauthorizedComponent },
  { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(a => a.AdminModule), canActivate: [adminauthGuard]},
  { path: "employee", loadChildren: () => import('./modules/employee/employee.module').then(e => e.EmployeeModule), canActivate: [employeeauthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
