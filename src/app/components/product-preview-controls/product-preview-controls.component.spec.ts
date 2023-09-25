import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewControlsComponent } from './product-preview-controls.component';

describe('ProductPreviewControlsComponent', () => {
  let component: ProductPreviewControlsComponent;
  let fixture: ComponentFixture<ProductPreviewControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductPreviewControlsComponent]
    });
    fixture = TestBed.createComponent(ProductPreviewControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
