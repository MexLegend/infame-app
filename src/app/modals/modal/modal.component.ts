import { Component, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicContentDirective } from 'src/app/directives/dynamic-content.directive';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DynamicContentDirective, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild(DynamicContentDirective, { static: true }) modalContent!: DynamicContentDirective;

  modalDataSubscription$!: Subscription;
  closeModalSubscription$!: Subscription;

  title: string = "";
  showModal: boolean = false;
  customClasses: string = "max-sm:tw-max-w-[95%] tw-max-w-[80%] lg:tw-max-w-[800px]";
  closeOnBackdropClick?: boolean = false;
  closeModalButton?: boolean = true;
  onCloseEmitter!: EventEmitter<any>;

  documentBody: HTMLElement | null = null;

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {
    this.documentBody = document.querySelector('body');
  }

  ngOnInit(): void {
    this.loadModalContent();
    this.closeModal();
  }

  ngOnDestroy(): void {

    const [route, shotModal] = this.router.url.split("/show-modal");

    if (this.router.url.includes("/show-modal")) this.router.navigate([route]);

    this.modalDataSubscription$.unsubscribe();
    this.closeModalSubscription$.unsubscribe();
  }

  closeModal() {
    this.closeModalSubscription$ = this.modalService.toggleModal.subscribe((isShowing) => {
      if (!isShowing) this.showModal = false;
    });
  }

  loadModalContent() {
    this.modalDataSubscription$ = this.modalService.getModalData().subscribe(({
      title,
      component,
      data,
      enableClose,
      closeModalButton,
      customClasses,
      onClose
    }) => {

      this.hangleOverflow();

      this.title = title;
      this.closeOnBackdropClick = enableClose;
      this.closeModalButton = closeModalButton;
      this.onCloseEmitter = onClose!;

      if (customClasses) this.customClasses = customClasses;
      const viewContainerRef = this.modalContent.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<any>(component);
      componentRef.location.nativeElement.style = "width: 100%";
      this.showModal = true;
      componentRef.instance.data = data;
      componentRef.instance.onCloseEmitter = onClose;
    })
  }

  hangleOverflow() {
    this.documentBody?.classList.add('overflow-clip');
  }

  handleClose() {
    this.modalService.toggleModal.emit(false);
    this.onCloseEmitter.emit(null);
  }
}
