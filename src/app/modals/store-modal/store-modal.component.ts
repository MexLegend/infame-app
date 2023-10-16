import { Component, EventEmitter, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAction, ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { AuthService } from 'src/app/services/auth.service';
import { SafeStore, Store } from 'src/app/types/store';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

export interface StoreDialogData {
  action: ModalAction;
  title: string;
  stores: WritableSignal<SafeStore[]>;
}

@Component({
  selector: 'app-store-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './store-modal.component.html',
  styleUrls: ['./store-modal.component.scss']
})
export class StoreModalComponent {

  @Input() data!: StoreDialogData;
  @Input() onCloseEmitter!: EventEmitter<any>;

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  handleClose(data?: any) {
    this.modalService.toggleModal.emit(false);
    this.onCloseEmitter.emit(data)
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [{ value: null, disabled: false }, Validators.required]
    });
  }

  handleCreate() {
    this.isLoading = true;

    const { name } = this.form.value;

    const storeData: Store = {
      name,
      slug: name.toLocaleLowerCase().replaceAll(" ", "_").replaceAll("-", "_"),
      userId: this.authService.getCurrentUser()!.id
    }

    const createStoreSub$ = this.storeService.createStore(storeData).subscribe((store) => {

      this.isLoading = false;
      this.router.navigate(["/admin/" + store.id]);

      this.handleClose(store);
      createStoreSub$.unsubscribe();
    });

  }

}
