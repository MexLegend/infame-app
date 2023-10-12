import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWidgetComponent } from './upload-widget.component';

describe('UploadWidgetComponent', () => {
  let component: UploadWidgetComponent;
  let fixture: ComponentFixture<UploadWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadWidgetComponent]
    });
    fixture = TestBed.createComponent(UploadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
