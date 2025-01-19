import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-assign-activity-dialog',
  templateUrl: './assign-activity-dialog.component.html',
  styleUrl: './assign-activity-dialog.component.css'
})
export class AssignActivityDialogComponent {

  assignActivityForm!: FormGroup;
  listOfStudents: any = [];
  listOfActivities: any = [];
  user: any = StorageService.getUser();

  constructor(private router: Router, private adminService: AdminService, private snackbar: MatSnackBar,public dialogRef: MatDialogRef<AssignActivityDialogComponent>) {
    this.assignActivityForm = new FormGroup({
      activityConfigurationId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      operationUserId: new FormControl(this.user.id, [Validators.required]),
      createdByView: new FormControl(this.user.username, [Validators.required]),
    });
    this.getUser();
    this.getActivities();
  }

  getUser(){
    this.adminService.getUsers().subscribe((res) => {
      this.listOfStudents = res;
    });
  }

  getActivities(){
    this.adminService.getActivityConfigs().subscribe({
      next: (res) => {
        this.listOfActivities = res;
      }
    });
  }

  submit() {
    if (this.assignActivityForm.valid) {
      //console.log(this.assignActivityForm.value)
      this.adminService.postAssignActivity(this.assignActivityForm.value).subscribe({
        next: (res) => {
          if(res.id != null) {
            this.snackbar.open('Assign activity created successfully.', 'Close', { duration: 5000 });
            this.dialogRef.close(res);
          }
        },
        error: (error) => {
          this.snackbar.open('Error assigning activity', 'Error', { duration: 5000 });
          console.log("Error assigning activity", error)
        }
      });
    } else {
      this.snackbar.open('Form is invalid', 'Error', { duration: 5000 });
    }
  }
}

