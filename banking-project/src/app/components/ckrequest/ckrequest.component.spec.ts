import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkrequestComponent } from './ckrequest.component';

describe('CkrequestComponent', () => {
  let component: CkrequestComponent;
  let fixture: ComponentFixture<CkrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CkrequestComponent]
    });
    fixture = TestBed.createComponent(CkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
