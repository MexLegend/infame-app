import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/types/product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { OrderItem } from 'src/app/types/order';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormatPricePipe],
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {

  @Input() orderItem!: OrderItem;
  @Input() orderItemIndex!: number;
  @Output() handleRemove: EventEmitter<number> = new EventEmitter<number>();

  handleRemoveOrderItem(){
    this.handleRemove.emit(this.orderItemIndex);
  }

}
