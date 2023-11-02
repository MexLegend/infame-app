import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessComponent } from './components/success/success.component';
import { ErrorComponent } from './components/error/error.component';
import { OrderService } from '../../../services/order.service';
import { Order } from 'src/app/types/order';
import { LoadingComponent } from '../../admin/components/loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [CommonModule, ContainerComponent, SuccessComponent, ErrorComponent, LoadingComponent],
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent {

  fragmentSub$!: Subscription;

  showSuccessMessage: boolean = false;
  order!: Order;
  isLoading: boolean = true;

  constructor(
    private orderService: OrderService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fragmentSub$ = this.activatedRoute.fragment.subscribe(fragment => {
      this.showSuccessMessage = fragment === 'success';
    });

    this.getCurrentOrder();
  }

  ngOnDestroy(): void {
    this.fragmentSub$.unsubscribe();
  }

  getCurrentOrder() {
    const { orderId } = this.activatedRoute.snapshot.params;

    const getOneOrderSub$ = this.orderService.getOneOrder(orderId).subscribe({
      next: order => {

        if (!order) this.router.navigateByUrl("/");
        if (this.showSuccessMessage) this.clearOrder();

        this.order = order;
        this.isLoading = false;

        getOneOrderSub$.unsubscribe();
      },
      error: () => {
        this.router.navigateByUrl("/");
        getOneOrderSub$.unsubscribe();
      }
    });
  }

  clearOrder() {
    this.orderService.order.set(null);
    localStorage.removeItem("order");
  }

}
