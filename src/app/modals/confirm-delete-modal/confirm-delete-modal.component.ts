import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAction, ModalService } from 'src/app/services/modal.service';

export interface StoreDialogData {
  action: ModalAction;
  title: string;
}

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {

  @Input() data!: StoreDialogData;
  @Input() onCloseEmitter!: EventEmitter<any>;

  constructor(
    private modalService: ModalService
  ) { }

  handleClose(data?: any) {
    this.modalService.toggleModal.emit(false);
    this.onCloseEmitter.emit(data)
  }

}
