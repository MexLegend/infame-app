import { Component, Inject, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable, first, lastValueFrom } from 'rxjs';
import { CategoryResponse, CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types/category';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { MenuOption, MenuOptions } from 'src/app/components/dropdown/dropdown.component';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';

@Component({
  selector: 'app-categories',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent, MatIconModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Billboard',
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

  categoriesLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public categoryService: CategoryService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  getCategoriesObservable = (page: number, limit: number): Observable<CategoryResponse> => {
    return this.categoryService.getCategories({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const category = (data as Category);

      return {
        "Name": {
          label: category.name,
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Billboard": {
          image: category.billboard!.image?.url || null,
          label: category.billboard!.label,
          customContainerClasses: `tw-max-w-[210px] !tw-font-semibold`,
        },
        "Products Quantity": {
          label: (category.products?.length || 0).toString()
        },
        "Date": {
          label: this.datePipe.transform(category.createdAt, "dd MMM yyyy")!,
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
              menuOptions: this.getMenuOptions(data as Category)
            }
          ]
        }
      }
    });

    return formatedSource;
  }

  getMenuOptions(category: Category): MenuOptions {

    const menuItems: MenuOption[] = [
      {
        label: "Copy Id",
        icon: "file_copy",
        click: () => this.handleCopyCategoryId(category.id!)
      },
      {
        label: "Update",
        icon: "edit",
        click: () => this.handleUpdateCategory(category.id!)
      },
      {
        label: "Delete",
        icon: "delete",
        click: () => this.handleDeleteCategory(category.id!)
      }
    ];

    return { menuItems };
  }

  handleCopyCategoryId = (categoryId: string) => {
    navigator.clipboard.writeText(categoryId);
    this.notyf.success({
      message: "Category ID copied to clipboard.",
      position: {
        x: 'center',
        y: 'top'
      },
      duration: 1500
    });
  };

  handleUpdateCategory = (categoryId: string) => {
    this.router.navigate([categoryId], { relativeTo: this.route });
  }

  handleDeleteCategory = async (categoryId: string) => {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteCategorySub$ = this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.categoryService.reloadDataEmitter.emit(true);
      deleteCategorySub$.unsubscribe();
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
