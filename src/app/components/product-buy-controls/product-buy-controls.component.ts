import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectSizeControlsComponent } from '../product-select-size-controls/product-select-size-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/types/product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectComponent, SelectOptions } from '../Inputs/multi-select/multi-select.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product-buy-controls',
  standalone: true,
  imports: [
    CommonModule,
    ProductSelectSizeControlsComponent,
    MultiSelectComponent,
    MatIconModule,
    FormatPricePipe
  ],
  templateUrl: './product-buy-controls.component.html',
  styleUrls: ['./product-buy-controls.component.scss']
})
export class ProductBuyControlsComponent {

  @Input() product!: Product;

  form!: FormGroup;
  colorsOptions: SelectOptions[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private orderService: OrderService
  ) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.initSelectColorOptions();
  }

  initForm() {
    this.form = this.formBuilder.group({
      colorId: [null, Validators.required],
      sizeId: [null, Validators.required]
    });
  }

  initSelectColorOptions() {
    this.colorsOptions = this.product.colors!.map((color) => ({
      key: color.name,
      colorIcon: color.color,
      value: color.id!
    }));
    this.changeDetectorRef.detectChanges();
  }

  handleOrder() {

    const { colorId, sizeId } = this.form.value;

    this.orderService.setCurrentOrder(
      {
        colorId,
        colorName: this.product.colors?.find(c => c.id === colorId)!.name!,
        sizeId,
        sizeName: this.product.sizes?.find(s => s.id === sizeId)!.name!,
        productId: this.product.id!,
        product: this.product,
        quantity: 1
      },
      this.product.storeId
    );

  }

}
