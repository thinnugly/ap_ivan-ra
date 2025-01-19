import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Item } from '../../models/item.model';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deploy-dialog',
  templateUrl: './deploy-dialog.component.html',
  styleUrl: './deploy-dialog.component.css'
})
export class DeployDialogComponent {

  activityForm!: FormGroup;
  user: any = StorageService.getUser();

  constructor(
    public dialogRef: MatDialogRef<DeployDialogComponent>,
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private router: Router,
  ) {
    this.activityForm = this.fb.group({
      userActivityId: [data.id, Validators.required],
      activityConfigurationId: [data.activityConfigurationId, Validators.required],
      technicalDescription: [data.technicalDescription, Validators.required],
      operationUserEmail: [data.operationUserEmail, Validators.required],
      userId: [this.user.id, Validators.required],
      userName: [this.user.username, [Validators.required]],
      activityDeployed: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const validExtensions = ['pdf', 'txt', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExtension || '')) {
      this.snackbar.open('Invalid file type. Only PDF, TXT, DOC, or DOCX allowed.', 'Error', { duration: 5000 });

      this.activityForm.get(field)?.setValue(null);
      event.target.value = '';

    } else {
      this.activityForm.get(field)?.setValue(file);
      this.activityForm.get(field)?.setErrors(null);
    }
  }

  submit() {
    if (this.activityForm.valid) {
      const formData = new FormData();
      formData.append('userActivityId', this.activityForm.value.userActivityId);
      formData.append('userId', this.activityForm.value.userId);
      formData.append('activityDeployed', this.activityForm.value.activityDeployed);

      this.employeeService.postDeployActivity(formData)
        .subscribe(response => {
          this.snackbar.open('Activity deploy created successfully.', 'Close', { duration: 5000 });
          this.employeeService.triggerRefresh();
          this.dialogRef.close();
          //this.dialogRef.close(true);
        }, error => {
          this.snackbar.open('Error deploying the activity: ' + error.message, 'Error', { duration: 5000 });
        });
    }
  }


}
