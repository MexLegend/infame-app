import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicContent]',
  standalone: true
})
export class DynamicContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
