import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBuyControlsComponent } from './product-buy-controls.component';

describe('ProductBuyControlsComponent', () => {
  let component: ProductBuyControlsComponent;
  let fixture: ComponentFixture<ProductBuyControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductBuyControlsComponent]
    });
    fixture = TestBed.createComponent(ProductBuyControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
