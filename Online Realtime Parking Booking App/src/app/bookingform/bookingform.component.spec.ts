/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingformComponent } from './bookingform.component';

describe('BookingformComponent', () => {
  let component: BookingformComponent;
  let fixture: ComponentFixture<BookingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
