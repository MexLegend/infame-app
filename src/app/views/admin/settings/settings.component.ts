import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormService } from '../../../services/reactive-form.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    ApiRoutesComponent,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private reactiveFormService: ReactiveFormService
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      website: [null, Validators.required]
    });
  }

  handleSubmit = () => {
    if (this.form.invalid) {
      this.reactiveFormService.addFocusOnFirstInvalidInput(this.form, this.elementRef);
      return;
    }

    console.log(this.form.value);

  }


}
