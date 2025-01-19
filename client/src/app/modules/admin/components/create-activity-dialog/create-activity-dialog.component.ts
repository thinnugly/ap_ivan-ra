import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';


@Component({
  selector: 'app-create-activity-dialog',
  templateUrl: './create-activity-dialog.component.html',
  styleUrls: ['./create-activity-dialog.component.css'],
})
export class CreateActivityDialogComponent {

  activityForm!: FormGroup;
  user: any = StorageService.getUser();

  constructor(
    public dialogRef: MatDialogRef<CreateActivityDialogComponent>,
    private adminService: AdminService,
    private snackbar: MatSnackBar, private fb: FormBuilder,
  ) {
    this.activityForm = this.fb.group({
      technicalDescription: ['', Validators.required],
      activityInstructions: [null, [Validators.required]],
      supportMaterial: [null, [Validators.required]],
      userId: [this.user.id, [Validators.required]],
      createdByView: [this.user.username, [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  fileValidator(control: any) {
    const allowedExtensions = /(\.pdf|\.txt|\.doc|\.docx)$/i;
    if (control.value && !allowedExtensions.exec(control.value.name)) {
      return { invalidFileType: true };
    }
    return null;
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

      //this.activityForm.get(field)?.setErrors({ 'invalidFileType': true });
    } else {
      this.activityForm.get(field)?.setValue(file);
      this.activityForm.get(field)?.setErrors(null);
    }
  }

  submit() {
    if (this.activityForm.valid) {
      const formData = new FormData();
      formData.append('technicalDescription', this.activityForm.value.technicalDescription);
      formData.append('activityInstructions', this.activityForm.value.activityInstructions);
      formData.append('supportMaterial', this.activityForm.value.supportMaterial);
      formData.append('userId', this.activityForm.value.userId);

      console.log(this.activityForm.value)

      this.adminService.postActivityConfig(formData)
        .subscribe(response => {
          this.snackbar.open('Activity configuration created successfully.', 'Close', { duration: 5000 });
          this.dialogRef.close(response);
        }, error => {
          this.snackbar.open('Error creating activity:' + error, 'Error', { duration: 5000 });
        });
    } else {
      this.snackbar.open('Form is invalid', 'Error', { duration: 5000 });
    }
  }

}




