import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployTableComponent } from './deploy-table.component';

describe('DeployTableComponent', () => {
  let component: DeployTableComponent;
  let fixture: ComponentFixture<DeployTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
