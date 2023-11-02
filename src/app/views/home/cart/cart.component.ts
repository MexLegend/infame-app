import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { MatIconModule } from '@angular/material/icon';
import { CartProductComponent } from 'src/app/components/cart-product/cart-product.component';
import { Order, UpdateOrderProductQuantity } from 'src/app/types/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ContainerComponent, CheckoutComponent, MatIconModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private orderService: OrderService) { }

  order: WritableSignal<Order | null> = this.orderService.order;

  handleRemoveOrderItem(index: number) {
    this.order()?.orderItems.splice(index, 1);
    this.order.set(this.order());
    localStorage.setItem("order", JSON.stringify(this.order()));
  }

  handleUpdateOrderItemQuantity({ index, quantity }: UpdateOrderProductQuantity) {
    this.order()!.orderItems[index].quantity = quantity;
    this.order.set(this.order());
    localStorage.setItem("order", JSON.stringify(this.order()));
  }

}
