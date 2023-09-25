import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorFilterComponent } from './product-color-filter.component';

describe('ProductColorFilterComponent', () => {
  let component: ProductColorFilterComponent;
  let fixture: ComponentFixture<ProductColorFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductColorFilterComponent]
    });
    fixture = TestBed.createComponent(ProductColorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
