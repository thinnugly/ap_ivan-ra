import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Item } from '../../models/item.model';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-edit-activity-dialog',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrl: './edit-activity-dialog.component.css',
})
export class EditActivityDialogComponent {
  activityForm!: FormGroup;
  user: any = StorageService.getUser();

  constructor(
    public dialogRef: MatDialogRef<EditActivityDialogComponent>,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.activityForm = this.fb.group({
      activityId: [data.id, Validators.required],
      technicalDescription: [data.technicalDescription, Validators.required],
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
      this.snackbar.open(
        'Invalid file type. Only PDF, TXT, DOC, or DOCX allowed.',
        'Error',
        { duration: 5000 }
      );

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
      formData.append(
        'technicalDescription',
        this.activityForm.value.technicalDescription
      );
      formData.append(
        'activityInstructions',
        this.activityForm.value.activityInstructions
      );
      formData.append(
        'supportMaterial',
        this.activityForm.value.supportMaterial
      );
      formData.append('userId', this.activityForm.value.userId);

      this.adminService
        .putActivityConfig(this.activityForm.value.activityId, formData)
        .subscribe(
          (response) => {
            this.snackbar.open(
              'Activity configuration updated successfully.',
              'Close',
              { duration: 5000 }
            );
            this.dialogRef.close(response);
          },
          (error) => {
            this.snackbar.open(
              'Error updating activity:' + error.message,
              'Error',
              { duration: 5000 }
            );
          }
        );
    } else {
      this.snackbar.open('Form is invalid', 'Error', { duration: 5000 });
    }
  }
}
