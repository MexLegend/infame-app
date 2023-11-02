import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../types/order';

@Pipe({
  name: 'getCartProductImage',
  standalone: true
})
export class GetCartProductImagePipe implements PipeTransform {

  transform(orderItem: OrderItem): string {
    return orderItem.product!.images.find(image => image.colorId === orderItem.colorId)!.url;
  }

}
