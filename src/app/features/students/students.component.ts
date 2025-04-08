import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { StudentService } from '../../core/services/student/student.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { LocationChangeService } from '../../shared/services/location-change.service';
import { DeleteModalComponent } from '../../shared/components/modals/delete-modal/delete-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmptyTableNoticeComponent } from '../../shared/components/empty-table-notice/empty-table-notice.component';
import { CamelToUpperCasePipe } from '../../shared/pipes/camel-to-upper-case.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    EmptyTableNoticeComponent,
    SummaryCardComponent,
    CamelToUpperCasePipe,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isTableEmpty$: WritableSignal<boolean> = signal(true);
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'score',
    'dob',
    'className',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;
  pageSize: number = 5;
  pageIndex: number = 1;
  itemsCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchField$: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toastManService: NotificationService,
    private locationChangeService: LocationChangeService,
    private dialog: MatDialog,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    console.info('Called');
    if (this.dataSource.data) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  onDeleteRow(rowData: any) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: {
        pageFunction: `Delete ${rowData.firstName} ${rowData.lastName}? `,
        deleteModule: 'Student',
        rowData: rowData,
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this record?',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (_res: boolean) => {
        if (_res) {
          this.handleDeletePType(rowData);
        }
      },
    });
  }

  onEdit = (rowData: any) => {
    const route: string = `/dashboard/pType/manage`;
    this.router
      .navigate([route], {
        queryParams: {
          rowData: JSON.stringify(rowData),
          action: 'Update',
        },
        skipLocationChange: true,
      })
      .then(() => {});
  };

  onViewMore = (rowData: any): void => {
    this.locationChangeService.setRowData(rowData);
    const route: string = `/dashboard/data-viewer`;
    this.router
      .navigate([route], {
        queryParams: {
          action: 'View',
          title: 'Student Data',
        },
      })
      .then(() => {});
  };

  onAddStudent = (): void => {
    this.router.navigate(['/dashboard/pType/manage']).then(() => {});
  };

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadStudents();
  }

  onReload(): void {
    this.loadStudents();
  }

  searchField = () => {
    if (this.searchField$()) return this.searchField$.set(false);
    return this.searchField$.set(true);
  };

  //DB Cost minimization
  protected optimallySearch($event?: Event) {
    let searchTerm;
    if ($event) {
      searchTerm = ($event.target as HTMLInputElement).value;

      if (searchTerm && searchTerm.length > 2) {
        this.loadStudents(searchTerm);
      }
    }
  }

  protected onFilterTable($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    console.info('FilterValue: ', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private loadStudents(searchTerm?: string): void {
    const paginationData = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      searchTerm: searchTerm,
    };
    this.studentService
      .fetchStudents(paginationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.isTableEmpty$.update(() => res.entity?.length === 0);
            this.dataSource = new MatTableDataSource<any>(res?.entity);
            this.pageIndex = res.pagination.pageIndex;
            this.itemsCount = res.pagination.totalRecords || 0;
            this.studentService.setTotalStudents(this.itemsCount);
            console.info(
              'Total Records: ',
              this.studentService.getTotalStudents()
            );
            this.pageSize = res.pagination.pageSize;
          } else {
            this.toastManService.showNotificationMessage(
              res.message,
              'snackbar-danger'
            );
          }
        },
        error: () => {
          this.toastManService.showNotificationMessage(
            'Internal Server Error',
            'snackbar-danger'
          );
        },
      });
  }

  private handleDeletePType = (rowData: any): void => {
    this.studentService
      .deleteStudent(rowData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          if (resp.statusCode === 200) {
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-success'
            );
          }
          this.toastManService.showNotificationMessage(
            resp.message,
            'snackbar-danger'
          );
        },
        error: () => {
          this.toastManService.showNotificationMessage(
            'Internal Server Error',
            'snackbar-danger'
          );
        },
        complete: (): void => {
          this.loadStudents();
        },
      });
  };
}
