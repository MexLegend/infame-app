import { EventEmitter, Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

interface Modal {
  title: string;
  data: any;
  enableClose?: boolean;
  closeModalButton?: boolean;
  component: ComponentType<unknown>;
  customClasses?: string;
  transparentModal?: boolean;
  isExpanded?: boolean;
  onClose?: EventEmitter<any>;
}

export type ModalAction = "Create" | "Update" | "Delete" | "Read";

export type ModalType = "Bulletin";

export interface ModalContent {
  modalTye?: ModalType;
  showCloseButton?: boolean;
  action: ModalAction;
  title: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor() { }

  private modalData = new Subject<Modal>();
  public toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public setDynamicModalContent: EventEmitter<ModalContent> = new EventEmitter<ModalContent>();

  // Show Modal emitting true and then await 10 milliseconds
  // to be sure that the modal component is rendered before render its content
  setModalData(props: Modal): EventEmitter<any> {
    const onCloseEmitter: EventEmitter<any> = new EventEmitter<any>();
    this.toggleModal.emit(true);
    setTimeout(() => this.modalData.next({ ...props, onClose: onCloseEmitter }), 10);
    return onCloseEmitter;
  }

  getModalData(): Observable<Modal> {
    return this.modalData.asObservable();
  }

}
