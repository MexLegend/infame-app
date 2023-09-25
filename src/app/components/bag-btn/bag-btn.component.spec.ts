import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagBtnComponent } from './bag-btn.component';

describe('BagBtnComponent', () => {
  let component: BagBtnComponent;
  let fixture: ComponentFixture<BagBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BagBtnComponent]
    });
    fixture = TestBed.createComponent(BagBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
