import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEditActivityComponent } from './assign-edit-activity.component';

describe('AssignEditActivityComponent', () => {
  let component: AssignEditActivityComponent;
  let fixture: ComponentFixture<AssignEditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignEditActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
