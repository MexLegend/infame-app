import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true
})
export class FormatPricePipe implements PipeTransform {

  transform(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  }

}
