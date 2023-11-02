import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { OrderItem, UpdateOrderProductQuantity } from 'src/app/types/order';
import { GetCartProductImagePipe } from 'src/app/pipes/get-cart-product-image.pipe';
import { CounterComponent } from '../Inputs/counter/counter.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, CounterComponent, FormatPricePipe, GetCartProductImagePipe],
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {

  @Input() orderItem!: OrderItem;
  @Input() orderItemIndex!: number;
  @Output() handleRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleUpdate: EventEmitter<UpdateOrderProductQuantity> = new EventEmitter<UpdateOrderProductQuantity>();

  quantityForm!: FormGroup;
  quantityFormChangesSub$!: Subscription;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
    this.initQuantityForm();
  }

  ngOnDestroy(): void {
    this.quantityFormChangesSub$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.quantityForm.setValue({ quantity: this.orderItem.quantity });
    this.changeDetectorRef.detectChanges();
  }

  initQuantityForm() {
    this.quantityForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.handleQuantityFormChanges();
  }

  handleQuantityFormChanges() {
    this.quantityFormChangesSub$ = this.quantityForm.valueChanges.subscribe(({ quantity }) => {
      this.handleUpdate.emit({ index: this.orderItemIndex, quantity });
    });
  }

  handleRemoveOrderItem() {
    this.handleRemove.emit(this.orderItemIndex);
  }

}
