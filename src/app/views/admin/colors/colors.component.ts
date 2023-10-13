import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable, first, lastValueFrom } from 'rxjs';
import { ColorResponse, ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/types/color';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { ModalService } from 'src/app/services/modal.service';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';

@Component({
  selector: 'app-colors',
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    TableComponent,
    ApiRoutesComponent,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Color',
      isSortable: true
    },
    {
      label: 'Products Quantity',
      isSortable: true
    },
    {
      label: 'Date',
      isSortable: true
    },
    {
      label: 'Actions',
      isSortable: false
    }
  ];

  colorsLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public colorsService: ColorService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  getColorsObservable = (page: number, limit: number): Observable<ColorResponse> => {
    return this.colorsService.getColors({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const color = (data as Color);

      return {
        "Name": {
          label: color.name,
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Color": {
          label: color.color,
          customContainerClasses: `tw-max-w-[60px]`,
          customWrapperClasses: `tw-justify-center tw-px-3 tw-py-1 tw-text-white tw-bg-rose-600 tw-rounded-lg`
        },
        "Products Quantity": {
          label: (color.products?.length || 0).toString()
        },
        "Date": {
          label: this.datePipe.transform(color.createdAt, "dd MMM yyyy")!,
          customContainerClasses: "tw-min-w-[120px]"
        },
        "Actions": {
          label: "",
          customContainerClasses: "!tw-min-w-[90px]",
          actions: [
            {
              label: "",
              materialIcon: "more_vert",
              customWrapperClasses: `
              tw-transition 
              tw-duration-200 
              tw-cursor-pointer 
              tw-rounded-full 
              tw-h-10 
              tw-w-10
              tw-ml-auto
              !tw-flex-none 
              !tw-p-0
              tw-justify-center
              active:tw-scale-95 
              tw-font-medium
              tw-leading-none
              tw-border
              tw-border-neutral-200
              tw-bg-neutral-100
              hover:tw-bg-black
              hover:tw-text-white
              `,
              click: undefined,
              isMenu: true,
              menuOptions: this.getMenuOptions(data as Color)
            }
          ]
        }
      }
    });

    return formatedSource;
  }

  getMenuOptions(color: Color): MenuOptions {

    const menuItems: MenuOption[] = [
      {
        label: "Copy Id",
        icon: "file_copy",
        click: () => this.handleCopyColorId(color.id!)
      },
      {
        label: "Update",
        icon: "edit",
        click: () => this.handleUpdateColor(color.id!)
      },
      {
        label: "Delete",
        icon: "delete",
        click: () => this.handleDeleteColor(color.id!)
      }
    ];

    return { menuItems };
  }

  handleCopyColorId = (colorId: string) => {
    navigator.clipboard.writeText(colorId);
    this.notyf.success({
      message: "Color ID copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });
  };

  handleUpdateColor = (colorId: string) => {
    this.router.navigate([colorId], { relativeTo: this.route });
  }

  handleDeleteColor = async (colorId: string) => {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteColorSub$ = this.colorsService.deleteColor(colorId).subscribe(() => {
      this.colorsService.reloadDataEmitter.emit(true);
      deleteColorSub$.unsubscribe();
    });
  }

  async handleConfirmDelete(): Promise<boolean> {
    const onClose = this.modalService.setModalData({
      component: ConfirmDeleteModalComponent,
      title: 'Are you sure?',
      data: {
        action: 'Delete'
      },
      customClasses: "tw-max-w-[600px]",
      enableClose: false,
      closeModalButton: true
    });

    const value: boolean | null = await lastValueFrom(onClose.pipe(first()));

    return !!value;

  }

}
