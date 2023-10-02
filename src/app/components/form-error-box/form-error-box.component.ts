import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-error-box',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './form-error-box.component.html',
  styleUrls: ['./form-error-box.component.scss']
})
export class FormErrorBoxComponent {

  @Input() label: string = "";
}
