import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../../../../components/container/container.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

}
