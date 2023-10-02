import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ReactiveFormsModule, ApiRoutesComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      website: [null, Validators.required]
    });
  }

}
