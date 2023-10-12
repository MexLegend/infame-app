import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SafeStore } from '../../../../types/store';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-store-select-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './store-select-item.component.html',
  styleUrls: ['./store-select-item.component.scss']
})
export class StoreSelectItemComponent {

  @Input() store!: SafeStore;
  @Input() storeIndex!: number;
  @Input() activeStore!: WritableSignal<number>;
  @Input() menuTrigger!: MatMenuTrigger;

  constructor(private router: Router) { }

  handleSetActiveStore() {
    this.menuTrigger.closeMenu();
    if (this.activeStore() === this.storeIndex) return;
    this.activeStore.set(this.storeIndex);
    this.router.navigate(["/admin/" + this.store.id]);
  }

}
