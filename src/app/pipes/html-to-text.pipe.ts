import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlToText',
  standalone: true
})
export class HtmlToTextPipe implements PipeTransform {

  transform(html: any): SafeHtml {
    return html.replace(/<[^>]*>/g, '');
  }

}
