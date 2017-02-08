/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookinglistComponent } from './bookinglist.component';

describe('BookinglistComponent', () => {
  let component: BookinglistComponent;
  let fixture: ComponentFixture<BookinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
