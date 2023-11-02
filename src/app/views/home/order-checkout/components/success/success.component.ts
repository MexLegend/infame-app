import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  @Input() order!: Order;
  orderTotal: Signal<number> = computed(() => this.getOrderTotal());

  getOrderTotal(): number {
    return this.order.orderItems.reduce((acc, curr) => acc += curr.product!.price * curr.quantity, 0) ?? 0
  }

}
