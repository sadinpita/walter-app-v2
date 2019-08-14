import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmeetupComponent } from './addmeetup.component';

describe('AddmeetupComponent', () => {
  let component: AddmeetupComponent;
  let fixture: ComponentFixture<AddmeetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmeetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
