import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRoute } from 'src/app/types/apiRoute';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-api-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-route.component.html',
  styleUrls: ['./api-route.component.scss']
})
export class ApiRouteComponent {

  @Input() route!: ApiRoute;

  constructor(@Inject(NOTYF) private notyf: Notyf) { }

  onCopy = (route: string) => {
    navigator.clipboard.writeText(route);
    this.notyf.success({
      message: "API Route copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });

  };

}
