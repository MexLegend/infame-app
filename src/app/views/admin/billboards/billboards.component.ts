import { Component, Inject, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable, first, lastValueFrom } from 'rxjs';
import { BillboardResponse, BillboardService } from 'src/app/services/billboard.service';
import { Billboard } from 'src/app/types/billboard';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-billboards',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent, MatIconModule, RouterModule],
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.scss']
})
export class BillboardsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Image',
      isSortable: false
    },
    {
      label: 'Label',
      isSortable: true
    },
    {
      label: 'Description',
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

  billboardsLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public billboardService: BillboardService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  getBillboardsObservable = (page: number, limit: number): Observable<BillboardResponse> => {
    return this.billboardService.getBillboards({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const billboard = (data as Billboard);

      return {
        "Image": {
          image: billboard.image?.url || null,
          label: "",
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Label": {
          label: billboard.label,
          customContainerClasses: `tw-max-w-[200px]`,
        },
        "Description": {
          label: billboard.description,
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(billboard.createdAt, "dd MMM yyyy")!,
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
              menuOptions: this.getMenuOptions(data as Billboard)
            }
          ]
        }
      }
    });

    return formatedSource;
  }

  getMenuOptions(billboard: Billboard): MenuOptions {

    const menuItems: MenuOption[] = [
      {
        label: "Copy Id",
        icon: "file_copy",
        click: () => this.handleCopyBillboardId(billboard.id!)
      },
      {
        label: "Update",
        icon: "edit",
        click: () => this.handleUpdateBillboard(billboard.id!)
      },
      {
        label: "Delete",
        icon: "delete",
        click: () => this.handleDeleteBillboard(billboard.id!)
      }
    ];

    return { menuItems };
  }

  handleCopyBillboardId = (billboardId: string) => {
    navigator.clipboard.writeText(billboardId);
    this.notyf.success({
      message: "Billboard ID copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });
  };

  handleUpdateBillboard = (billboardId: string) => {
    this.router.navigate([billboardId], { relativeTo: this.route });
  }

  handleDeleteBillboard = async (billboardId: string) => {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteBillboardSub$ = this.billboardService.deleteBillboard(billboardId).subscribe(() => {
      this.billboardService.reloadDataEmitter.emit(true);
      deleteBillboardSub$.unsubscribe();
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
