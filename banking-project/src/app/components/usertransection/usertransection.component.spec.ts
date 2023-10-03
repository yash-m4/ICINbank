import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertransectionComponent } from './usertransection.component';

describe('UsertransectionComponent', () => {
  let component: UsertransectionComponent;
  let fixture: ComponentFixture<UsertransectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertransectionComponent]
    });
    fixture = TestBed.createComponent(UsertransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
