import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignActivityTableComponent } from './assign-activity-table.component';

describe('AssignActivityTableComponent', () => {
  let component: AssignActivityTableComponent;
  let fixture: ComponentFixture<AssignActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignActivityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
