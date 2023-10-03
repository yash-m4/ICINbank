import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranshistoryComponent } from './transhistory.component';

describe('TranshistoryComponent', () => {
  let component: TranshistoryComponent;
  let fixture: ComponentFixture<TranshistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranshistoryComponent]
    });
    fixture = TestBed.createComponent(TranshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
