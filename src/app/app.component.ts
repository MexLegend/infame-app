import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './modals/modal/modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, ModalComponent]
})
export class AppComponent {

    closeModalSubscription$!: Subscription;

    showModal: boolean = false;
    documentBody: HTMLElement | null = null;

    constructor(
        private authService: AuthService,
        private modalService: ModalService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.authService.loadStorageUser();

        this.documentBody = document.querySelector('body');
        this.handleToggleModal();
    }

    ngOnDestroy(): void {
        this.closeModalSubscription$.unsubscribe();
    }

    handleToggleModal() {
        this.closeModalSubscription$ = this.modalService.toggleModal.subscribe((isShowing) => {
            if (isShowing) this.showModal = isShowing;
            else setTimeout(() => {
                this.documentBody?.classList.remove('overflow-clip');
                this.showModal = isShowing;
            }, 400);
            this.changeDetectorRef.detectChanges();
        });
    }
}
