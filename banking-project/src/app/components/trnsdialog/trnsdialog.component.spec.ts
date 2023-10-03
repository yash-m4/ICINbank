import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnsdialogComponent } from './trnsdialog.component';

describe('TrnsdialogComponent', () => {
  let component: TrnsdialogComponent;
  let fixture: ComponentFixture<TrnsdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrnsdialogComponent]
    });
    fixture = TestBed.createComponent(TrnsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
