import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectSizeControlsComponent } from './product-select-size-controls.component';

describe('ProductSelectSizeControlsComponent', () => {
  let component: ProductSelectSizeControlsComponent;
  let fixture: ComponentFixture<ProductSelectSizeControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductSelectSizeControlsComponent]
    });
    fixture = TestBed.createComponent(ProductSelectSizeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
