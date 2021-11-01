import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionDialogComponent } from './addition-dialog.component';

describe('AdditionDialogComponent', () => {
  let component: AdditionDialogComponent;
  let fixture: ComponentFixture<AdditionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
