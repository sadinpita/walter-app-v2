import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkerDialog } from './addworker.component';

describe('AddworkerComponent', () => {
  let component: AddWorkerDialog;
  let fixture: ComponentFixture<AddWorkerDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkerDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
