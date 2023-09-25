import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favorites-btn.component.html',
  styleUrls: ['./favorites-btn.component.scss']
})
export class FavoritesBtnComponent {

}
