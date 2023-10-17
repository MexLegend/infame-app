import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeStore } from 'src/app/types/store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss']
})
export class StoreCardComponent {

  @Input() store!: SafeStore;

}
