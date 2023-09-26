import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsComponent } from './colors.component';

describe('ColorsComponent', () => {
  let component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColorsComponent]
    });
    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
