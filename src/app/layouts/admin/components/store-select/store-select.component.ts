import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent, MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-store-select',
  standalone: true,
  imports: [CommonModule, DropdownComponent, MatIconModule, MatMenuModule],
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.scss']
})
export class StoreSelectComponent {


}
