import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBillboardComponent } from './new-billboard.component';

describe('NewBillboardComponent', () => {
  let component: NewBillboardComponent;
  let fixture: ComponentFixture<NewBillboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewBillboardComponent]
    });
    fixture = TestBed.createComponent(NewBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
