import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/types/order';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormatPricePipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @Input() order!: WritableSignal<Order | null>;

  constructor(private orderService: OrderService) { }

  orderTotal: Signal<number> = computed(() => this.getOrderTotal());

  orderTotalProducts: Signal<number> = this.orderService.orderTotalProducts;

  getOrderTotal(): number {
    return this.order()?.orderItems.reduce((acc, curr) => acc += curr.product!.price * curr.quantity, 0) ?? 0
  }

  handleCheckOut(){
    console.log("Hey");
    
  }

}
