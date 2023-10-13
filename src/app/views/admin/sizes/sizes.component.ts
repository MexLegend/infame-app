import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable, first, lastValueFrom } from 'rxjs';
import { Size } from 'src/app/types/size';
import { SizeResponse, SizeService } from 'src/app/services/size.service';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sizes',
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
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Size',
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

  sizesLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public sizeService: SizeService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  getSizesObservable = (page: number, limit: number): Observable<SizeResponse> => {
    return this.sizeService.getSizes({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const size = (data as Size);

      return {
        "Name": {
          label: size.name,
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Size": {
          label: size.value,
          customContainerClasses: `tw-max-w-[200px]`,
        },
        "Products Quantity": {
          label: (size.products?.length || 0).toString()
        },
        "Date": {
          label: this.datePipe.transform(size.createdAt, "dd MMM yyyy")!,
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
              menuOptions: this.getMenuOptions(data as Size)
            }
          ]
        }
      }
    });

    return formatedSource;
  }

  getMenuOptions(size: Size): MenuOptions {

    const menuItems: MenuOption[] = [
      {
        label: "Copy Id",
        icon: "file_copy",
        click: () => this.handleCopySizeId(size.id!)
      },
      {
        label: "Update",
        icon: "edit",
        click: () => this.handleUpdateSize(size.id!)
      },
      {
        label: "Delete",
        icon: "delete",
        click: () => this.handleDeleteSize(size.id!)
      }
    ];

    return { menuItems };
  }

  handleCopySizeId = (sizeId: string) => {
    navigator.clipboard.writeText(sizeId);
    this.notyf.success({
      message: "Size ID copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });
  };

  handleUpdateSize = (sizeId: string) => {
    this.router.navigate([sizeId], { relativeTo: this.route });
  }

  handleDeleteSize = async (sizeId: string) => {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteSizeSub$ = this.sizeService.deleteSize(sizeId).subscribe(() => {
      this.sizeService.reloadDataEmitter.emit(true);
      deleteSizeSub$.unsubscribe();
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
