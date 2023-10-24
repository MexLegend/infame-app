import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bag-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './bag-btn.component.html',
  styleUrls: ['./bag-btn.component.scss']
})
export class BagBtnComponent {

  constructor(private orderService: OrderService) { }

  orderTotalProducts: Signal<number> = this.orderService.orderTotalProducts;

}
