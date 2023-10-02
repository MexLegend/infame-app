import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { MatIconModule } from '@angular/material/icon';
import { CartProductComponent } from 'src/app/components/cart-product/cart-product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ContainerComponent, CheckoutComponent, MatIconModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

}
