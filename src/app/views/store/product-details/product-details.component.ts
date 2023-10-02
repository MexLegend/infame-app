import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductPreviewControlsComponent } from '../../../components/product-preview-controls/product-preview-controls.component';
import { ProductBuyControlsComponent } from 'src/app/components/product-buy-controls/product-buy-controls.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ProductCardComponent, ProductPreviewControlsComponent, ProductBuyControlsComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

}
