import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRoute } from 'src/app/types/apiRoute';
import { ApiRouteComponent } from '../api-route/api-route.component';
import { environment } from 'src/environments/environment';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-api-routes',
  standalone: true,
  imports: [CommonModule, ApiRouteComponent],
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss']
})
export class ApiRoutesComponent {

  @Input() label: string = "";
  @Input() entityName: string = "";
  @Input() entityIdName: string = "";

  constructor(private storeService: StoreService) { }

  baseUrl: Signal<string> = computed(() => environment.URI + "/api/" + this.storeService.currentStoreId());
  apiRoutes: Signal<ApiRoute[]> = computed(() => [
    {
      route: `${this.baseUrl()}/${this.entityName}`,
      method: "GET",
      isPublic: true
    },
    {
      route: `${this.baseUrl()}/${this.entityName}/{${this.entityIdName}}`,
      method: "GET",
      isPublic: true
    },
    {
      route: `${this.baseUrl()}/${this.entityName}`,
      method: "POST",
      isPublic: false
    },
    {
      route: `${this.baseUrl()}/${this.entityName}/{${this.entityIdName}}`,
      method: "PATCH",
      isPublic: false
    },
    {
      route: `${this.baseUrl()}/${this.entityName}/{${this.entityIdName}}`,
      method: "DELETE",
      isPublic: false
    }
  ]);

}
