import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { ItemAssign } from '../../models/Item_assign';

@Component({
  selector: 'app-assign-edit-activity',
  templateUrl: './assign-edit-activity.component.html',
  styleUrl: './assign-edit-activity.component.css'
})
export class AssignEditActivityComponent {

  assignActivityForm!: FormGroup;
  listOfStudents: any = [];
  listOfActivities: any = [];
  user: any = StorageService.getUser();

  constructor(private router: Router, private adminService: AdminService, private snackbar: MatSnackBar,public dialogRef: MatDialogRef<AssignEditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemAssign,) {
    this.assignActivityForm = new FormGroup({
      id: new FormControl(data.id, [Validators.required]),
      activityConfigurationId: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      dueDate: new FormControl(data.dueDate, [Validators.required]),
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
      this.adminService.putAssignActivity(this.assignActivityForm.value.id, this.assignActivityForm.value).subscribe({
        next: (res) => {
          if(res.id != null) {
            this.snackbar.open('Assign activity updated successfully.', 'Close', { duration: 5000 });
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
