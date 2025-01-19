import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignActivityDialogComponent } from './assign-activity-dialog.component';

describe('AssignActivityDialogComponent', () => {
  let component: AssignActivityDialogComponent;
  let fixture: ComponentFixture<AssignActivityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignActivityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
