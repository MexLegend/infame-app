import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { Notyf } from 'notyf';

export type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUBLIC_API_URL";

@Component({
  selector: 'app-api-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss']
})
export class ApiRoutesComponent {

  @Input() label: string = "";
  @Input() isPublic: boolean = true;
  @Input() route: string = "https://next-ecommerce-back.vercel.app/api/4406380b-bfdd-4c71-9962-3f2084e84ced/products";
  @Input() method: ApiMethod = "GET";

  constructor(@Inject(NOTYF) private notyf: Notyf) { }

  onCopy = () => {
    navigator.clipboard.writeText(this.route);
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
