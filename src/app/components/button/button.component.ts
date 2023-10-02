import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonType = "submit" | "reset" | "button";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ButtonComponent {

  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() label: string = "";
  @Input() onClick: (e: MouseEvent) => void = () => { };
  @Input() isLoading: boolean = false;
  @Input() customClasses?: string = "";
  @Input() type: ButtonType = "button";

}
