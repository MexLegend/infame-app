import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizeFilterComponent } from './product-size-filter.component';

describe('ProductSizeFilterComponent', () => {
  let component: ProductSizeFilterComponent;
  let fixture: ComponentFixture<ProductSizeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductSizeFilterComponent]
    });
    fixture = TestBed.createComponent(ProductSizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
