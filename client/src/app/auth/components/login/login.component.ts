import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackbar: MatSnackBar){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitLoginForm(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if(res.userId != null){
            const user = {
              id: res.userId,
              userRole: res.userRole,
              username: res.username
            }
            StorageService.saveUser(user);
            StorageService.saveToken(res.token);
            if(StorageService.isAdminLoggedIn())
              this.router.navigateByUrl('/admin');
            else if(StorageService.isEmployeeLoggedIn())
              this.router.navigateByUrl('/employee');
            this.snackbar.open("User logged with success.", "Close", {duration: 5000});
          }else{
            this.snackbar.open("Signin failed. Try again.", "Close", {duration: 5000, panelClass: "error-snackbar"});
          }
        },
        error: (err) => {
          if(err.status === 401){
            this.snackbar.open("Invalid credentials.", "Close", { duration: 5000, panelClass: "error-snackbar" });
          } else {
            this.snackbar.open("Signin failed. Try again.", "Close", { duration: 5000, panelClass: "error-snackbar" });
          }
        }
      });
    }
  }

  signupForm(){
    this.router.navigateByUrl('auth/signup');
  }
}
