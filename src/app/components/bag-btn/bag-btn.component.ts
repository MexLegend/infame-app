import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bag-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './bag-btn.component.html',
  styleUrls: ['./bag-btn.component.scss']
})
export class BagBtnComponent {

}
