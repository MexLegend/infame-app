import { Component, EventEmitter, Input, ViewChild, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription, merge } from 'rxjs';
import { SafeTableHeadersPipe } from 'src/app/pipes/safe-table-headers.pipe';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { DropdownComponent, MenuOptions } from '../dropdown/dropdown.component';
import { HtmlToTextPipe } from 'src/app/pipes/html-to-text.pipe';

export type DefaultImageType = "practice-area" | "publication" | "user" | "user-transparent";

export interface DataSource {
  [key: string]: {
    label: string;
    subtitle?: string;
    customContainerClasses?: string;
    customWrapperClasses?: string;
    image?: string | null;
    images?: string[];
    isHtml?: boolean;
    materialIcon?: string;
    fsIcon?: string;
    routerLink?: string;
    actions?: DataSourceAction[]
  }
}

export interface DataSourceAction {
  customWrapperClasses?: string;
  label: string;
  image?: string;
  isMenu?: boolean;
  materialIcon?: string;
  fsIcon?: string;
  routerLink?: string;
  click?: () => void;
  menuOptions?: MenuOptions;
}

export interface DisplayedColumn {
  label: string;
  isSortable: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    CdkDropList,
    CdkDrag,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SafeTableHeadersPipe,
    ImgPipe,
    DropdownComponent,
    HtmlToTextPipe
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() getData: (page: number, limit: number) => Observable<any> = () => new Observable();
  @Input() dataResults?: WritableSignal<number>;
  @Input() reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() formatDataFunction: (dataSource: DataSource[]) => DataSource[] = () => [];
  @Input() displayedColumns: DisplayedColumn[] = [];
  @Input() searchFilterLabel: string = "";
  @Input() activeSortLabel: string = "";
  @Input() emptyRegistersLabel: string = "";
  @Input() isReOrderable: boolean = true;

  reloadDataSub$?: Subscription;
  sortChangesSub$?: Subscription;
  routeFragmentSub$?: Subscription;

  activeTab: WritableSignal<number> = signal(0);
  resultsLength: number = 0;
  hasError: boolean = false;
  isLoadingResults: boolean = true;
  dataSource!: MatTableDataSource<DataSource>;
  selection = new SelectionModel<DataSource>(true, []);

  ngAfterViewInit() {
    this.getDataSource();
    this.handleReloadTableDataSource();
    this.handlePaginatorChanges();
  }

  ngOnDestroy(): void {
    this.reloadDataSub$?.unsubscribe();
    this.sortChangesSub$?.unsubscribe;
    this.routeFragmentSub$?.unsubscribe();
  }

  initTableSortAndPaginators() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate() {
    return (data: DataSource, filter: string) => {

      const accumulator = (currentTerm: any, key: string) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the data string by converting it to lowercase and removing accents.
      const transformedDataStr = dataStr.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace and accents.
      const transformedFilter = filter.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }

      return transformedDataStr.indexOf(transformedFilter) !== -1;
    };

  }

  nestedFilterCheck(search: string, data: any, key: string) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  handleSortData(sort: Sort) {
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active].label, b[sort.active].label, isAsc)
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  handleReorderRow(event: CdkDragDrop<DataSource>) {
    console.log(this.dataSource.data);
    console.log(event.previousIndex);
    console.log(event.currentIndex);

    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    console.log(this.dataSource.data);

    this.dataSource.data = [...this.dataSource.data];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DataSource): string {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'deseleccionar' : 'seleccionar'} todos`;
    // }
    // return `${this.selection.isSelected(row) ? 'deseleccionar' : 'seleccionar'} fila ${row['id'] + 1}`;
    return "";
  }

  getDataSource() {
    this.isLoadingResults = true;
    this.hasError = false;

    const getDataObservable: Observable<any> = this.getData(this.paginator.pageIndex + 1, this.paginator.pageSize);

    this.subscribeAndGetDataSource(getDataObservable);
  }

  subscribeAndGetDataSource(observable: Observable<any>) {
    const getDataSub$ = observable.subscribe({
      next: (response) => {

        this.dataSource = new MatTableDataSource(this.formatDataFunction(response));
        this.dataResults?.set(response.length);

        this.dataSource.filterPredicate = this.getFilterPredicate();
        this.resultsLength = response.total;

        this.isLoadingResults = false;
        getDataSub$.unsubscribe();
      },
      error: () => {
        this.isLoadingResults = false;
        this.hasError = true;
        getDataSub$.unsubscribe();
      }
    });
  }

  handlePaginatorChanges() {

    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.sort.sortChange

    this.sortChangesSub$ = merge(this.paginator.page)
      .subscribe(() => {

        this.getDataSource()
      });
  }

  handleReloadTableDataSource() {
    this.reloadDataSub$ = this.reloadDataEmitter.subscribe(() => {
      this.getDataSource();
    });
  }
}
