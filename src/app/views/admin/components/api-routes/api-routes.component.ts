import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss']
})
export class ApiRoutesComponent {

  @Input() label: string = "";

}
