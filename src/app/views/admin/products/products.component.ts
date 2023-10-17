import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ProductResponse, ProductService } from 'src/app/services/product.service';
import { Observable, first, lastValueFrom } from 'rxjs';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Product } from 'src/app/types/product';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Archived',
      isSortable: false
    },
    {
      label: 'Featured',
      isSortable: false
    },
    {
      label: 'Price',
      isSortable: true
    },
    {
      label: 'Category',
      isSortable: true
    },
    {
      label: 'Sizes',
      isSortable: true
    },
    {
      label: 'Colors',
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

  productsLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public productsService: ProductService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  getProductsObservable = (page: number, limit: number): Observable<ProductResponse> => {
    return this.productsService.getProducts({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const product = (data as Product);

      return {
        "Name": {
          label: product.name,
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Archived": {
          label: product.isArchived ? 'True' : 'False',
          customContainerClasses: `tw-max-w-[200px]`,
        },
        "Featured": {
          label: product.isFeatured ? 'True' : 'False',
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Price": {
          label: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price),
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Category": {
          label: product.category!.name,
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Sizes": {
          label: product.sizes!.map(size => size.name).join(", "),
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Colors": {
          label: product.colors!.map(color => color.name).join(", "),
          customContainerClasses: `tw-max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(product.createdAt, "dd MMM yyyy")!,
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
              menuOptions: this.getMenuOptions(data as Product)
            }
          ]
        }
      }
    });

    return formatedSource;
  }

  getMenuOptions(product: Product): MenuOptions {

    const menuItems: MenuOption[] = [
      {
        label: "Copy Id",
        icon: "file_copy",
        click: () => this.handleCopyProductId(product.id!)
      },
      {
        label: "Update",
        icon: "edit",
        click: () => this.handleUpdateProduct(product.id!)
      },
      {
        label: "Delete",
        icon: "delete",
        click: () => this.handleDeleteProduct(product.id!)
      }
    ];

    return { menuItems };
  }

  handleCopyProductId = (productId: string) => {
    navigator.clipboard.writeText(productId);
    this.notyf.success({
      message: "Product ID copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });
  };

  handleUpdateProduct = (productId: string) => {
    this.router.navigate([productId], { relativeTo: this.route });
  }

  handleDeleteProduct = async (productId: string) => {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteProductSub$ = this.productsService.deleteProduct(productId).subscribe(() => {
      this.productsService.reloadDataEmitter.emit(true);
      deleteProductSub$.unsubscribe();
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
