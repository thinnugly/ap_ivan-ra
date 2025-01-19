import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ItemDeploy } from '../../models/deploy.model';


@Component({
  selector: 'app-deploy-edit-dialog',
  templateUrl: './deploy-edit-dialog.component.html',
  styleUrl: './deploy-edit-dialog.component.css'
})
export class DeployEditDialogComponent {

  activityForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeployEditDialogComponent>,
    private adminService: AdminService,
    private snackbar: MatSnackBar, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeploy,
  ) {
    this.activityForm = this.fb.group({
      id: [data.id, Validators.required],
      nota: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.activityForm.valid) {
      const formData = new FormData();
      formData.append('nota', this.activityForm.value.nota);

      this.adminService.putDeployActivity(this.activityForm.value.id, formData)
        .subscribe(response => {
          this.snackbar.open('Activity deploy updated successfully', 'Close', { duration: 5000 });
          //this.employeeService.triggerRefresh();
          this.dialogRef.close(response);
          //this.dialogRef.close(true);
        }, error => {
          this.snackbar.open(error.message, 'Error', { duration: 5000 });
        });
    }
  }
}
