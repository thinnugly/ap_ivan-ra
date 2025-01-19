import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployEditDialogComponent } from './deploy-edit-dialog.component';

describe('DeployEditDialogComponent', () => {
  let component: DeployEditDialogComponent;
  let fixture: ComponentFixture<DeployEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
