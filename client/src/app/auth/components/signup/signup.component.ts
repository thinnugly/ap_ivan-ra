import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { noSpecialCharsAndMinLength } from '../../../validators/no-numbers.validator';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isAdmin: boolean = false;
  listOfUserRole: any = ["EMPLOYEE", "ADMIN"];
  defaultRole: string = "EMPLOYEE";

  constructor(private router: Router, private authService: AuthService, private snackbar: MatSnackBar){
    this.signupForm = new FormGroup({
      username: new FormControl('', [noSpecialCharsAndMinLength()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userRole: new FormControl(this.defaultRole)
    });

  }
  ngOnInit(): void {
    this.isAdmin = StorageService.isAdminLoggedIn()
    if(!this.isAdmin){
      this.signupForm.removeControl('userRole');
    }
  }

  onSubmitSignupForm(){
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.id != null){
            this.snackbar.open("User "+this.signupForm.value.username+" created successful.", "Close", {duration: 5000});
            if(StorageService.isAdminLoggedIn())
              this.router.navigateByUrl('admin/dashboard');
            else
              this.router.navigateByUrl('auth/login');
          }else{
            this.snackbar.open("Signup failed. Try again.", "Close", {duration: 5000, panelClass: "error-snackbar"});
          }
        },
        error: (err) => {
          if(err.status === 406){
            this.snackbar.open("User already exists. Please try a different email.", "Close", { duration: 5000, panelClass: "error-snackbar" });
          } else {
            this.snackbar.open("Signup failed. Try again.", "Close", { duration: 5000, panelClass: "error-snackbar" });
          }
        }
      });
    }
  }

  loginForm(){
    this.router.navigateByUrl('auth/login');
  }
}
