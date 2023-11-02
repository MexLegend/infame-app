import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/types/order';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormatPricePipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @Input() order!: WritableSignal<Order | null>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  orderTotal: Signal<number> = computed(() => this.getOrderTotal());
  orderTotalProducts: Signal<number> = this.orderService.orderTotalProducts;
  isLoading: boolean = false;

  getOrderTotal(): number {
    return this.order()?.orderItems.reduce((acc, curr) => acc += curr.product!.price * curr.quantity, 0) ?? 0
  }

  handleCheckOut = () => {
    const user = this.authService.getCurrentUser()!;

    if (!user) {
      this.redirectoToLogin();
      return;
    }

    this.isLoading = true;

    const { orderItems, ...ordeData } = this.order()!;
    const formatedOrders = orderItems.map(({ productId, colorId, sizeId, quantity }) => ({
      productId, colorId, sizeId, quantity
    }));

    const formatedOrder: Order = {
      ...ordeData,
      orderItems: formatedOrders
    }

    const orderCheckoutSub$ = this.orderService.orderCheckout(formatedOrder).subscribe(({ url }) => {
      window.location.href = url;
      this.isLoading = false;
      orderCheckoutSub$.unsubscribe();
    });

  }

  redirectoToLogin() {
    this.router.navigateByUrl("signin");
  }

}
