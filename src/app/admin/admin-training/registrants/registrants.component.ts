import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';

import { WorkshopRegistration } from '../../../services/classes';
import { AdminService } from '../../../services/admin.service';
import { WorkshopsService } from '../../../services/workshops.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { WorkshopRegistrantFormComponent } from '../../modals/workshop-registrant-form/workshop-registrant-form.component';
import { WorkshopRegistrantCancelComponent } from '../../modals/workshop-registrant-cancel/workshop-registrant-cancel.component';
import { WorkshopRegistrantRefundComponent } from '../../modals/workshop-registrant-refund/workshop-registrant-refund.component';
import { WorkshopRegistrantDeleteComponent } from '../../modals/workshop-registrant-delete/workshop-registrant-delete.component';

@Component({
  selector: 'app-registrants',
  templateUrl: './registrants.component.html',
  styleUrls: ['./registrants.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class RegistrantsComponent implements OnInit {
  admin = this.adminService.state;
  registrants: WorkshopRegistration[];
  dataSource: MatTableDataSource<WorkshopRegistration>;
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'workshop',
    'workshop_date',
    'price',
    'reg_status',
    'pmt_status',
    'enrolled',
    'modified'
  ];
  pageIndex = 0;
  selectedRegistrant: WorkshopRegistration = new WorkshopRegistration();
  filter = '';
  filterTimeout: any;
  sorter = 'modified';
  sortOrder = 'desc';
  loading = true;
  error = false;

  @ViewChild('tableFunctions') tableFunctions: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private workshopService: WorkshopsService
  ) { }

  ngOnInit() {
    this.getRegistrants();
  }

  @HostListener('window:resize') resize() {
    this.setHeight();
  }

  setHeight() {
    let offset; // header and section padding

    if (window.innerWidth >= 768) {
      offset = 112;
    } else {
      offset = 88;
    }

    this.tableContainer.nativeElement.style.height = window.innerHeight - this.tableFunctions.nativeElement.offsetHeight - offset + 'px';
  }

  scrollTop() {
    document.querySelector('.adminTable').scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

  getRegistrants() {
    this.workshopService.getRegistrants()
      .subscribe(
        res => {
          this.registrants = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.search(this.filter);
          this.setHeight();
          this.loading = false;
        },
        err => this.showError()
      );
  }

  sortData(data) {
    this.sorter = data.active;
    this.sortOrder = data.direction;
  }

  search(data) {
    this.loading = true;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.dataSource.filter = data.trim().toLowerCase();
      this.registrants = this.dataSource.filteredData;
      this.pageIndex = 0;
      this.scrollTop();
      this.loading = false;
    }, 1000);
  }

  clearFilter() {
    this.filter = '';
    this.search(this.filter);
  }

  select(registrant) {
    this.selectedRegistrant === registrant ? this.selectedRegistrant = new WorkshopRegistration() : this.selectedRegistrant = registrant;
  }

  newReg() {
    const dialogRef = this.dialog.open(WorkshopRegistrantFormComponent, {
      data: new WorkshopRegistration(),
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedRegistrant = new WorkshopRegistration();
          this.getRegistrants();
        }
      );
  }

  editReg(registrant) {
    const dialogRef = this.dialog.open(WorkshopRegistrantFormComponent, {
      data: registrant,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedRegistrant = new WorkshopRegistration();
          this.getRegistrants();
        }
      );
  }

  cancelReg(registrant) {
    const dialogRef = this.dialog.open(WorkshopRegistrantCancelComponent, {
      data: registrant,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedRegistrant = new WorkshopRegistration();
          this.getRegistrants();
        }
      );
  }

  refundReg(registrant) {
    const dialogRef = this.dialog.open(WorkshopRegistrantRefundComponent, {
      data: registrant,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedRegistrant = new WorkshopRegistration();
          this.getRegistrants();
        }
      );
  }

  emailReg(registrant) {
    if (registrant.reg_status === 'Registered') {
      this.workshopService.confirmation(registrant)
        .subscribe(
          emlRes => this.showSnackBar(`Confirmation email sent to ${registrant.email}`, true),
          err => this.showSnackBar(`Error: Could not send confirmation email to ${registrant.email}`, false)
        );
    } else if (registrant.reg_status === 'Canceled') {
      this.workshopService.cancelation(registrant)
        .subscribe(
          emlRes => this.showSnackBar(`Cancelation email sent to ${registrant.email}`, true),
          err => this.showSnackBar(`Error: Could not send cancelation email to ${registrant.email}`, false)
        );
    }
  }

  showSnackBar(message, status) {
    this.snackBar.open(message, '', {
      duration: 2500,
      panelClass: status ? 'snackSuccess' : 'snackError'
    });
  }

  showError() {
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.error = false;
  }
}
