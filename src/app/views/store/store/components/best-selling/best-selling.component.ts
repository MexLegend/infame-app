import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ProductCardComponent],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent {

  @Input() products!: Product[];

}
