import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';

type Single = {
  name: string;
  value: any;
}

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent {

  single: Single[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Revenue';
  roundEdges = true;
  barPadding = 8;
  noBarWhenZero = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#ffa600',
      '#a05195',
      '#ff7c43',
      '#35A29F',
      '#de425b',
      '#40F8FF',
      '#79155B',
      '#0C356A',
      '#C23373',
      '#A10A28',
      '#765827',
      '#EAC696'
    ]
  };

  constructor(private storeService: StoreService, private orderService: OrderService) {
    this.getGraphRevenue();
  }

  getGraphRevenue() {
    const getGraphRevenueSub$ = this.orderService.getGraphRevenue(this.storeService.currentStoreId())
      .subscribe(graphRevenue => {
        this.single = graphRevenue;
        getGraphRevenueSub$.unsubscribe();
      });
  }

  onSelect(event: any) {
    console.log(event);
  }

}
