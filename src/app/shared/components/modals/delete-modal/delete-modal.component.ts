import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDivider,
    MatButtonModule,
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent implements OnInit {
  pageFunction: string = '';
  deleteText = 'This cant be undone!';
  deleteModule: string = '';
  rowData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteModalComponent>
  ) {}

  ngOnInit(): void {
    this.pageFunction = this.data.pageFunction;
    this.deleteModule = this.data.deleteModule;
    this.rowData = this.data.rowData;
    this.deleteText = this.data.message;
  }

  deleteModuleRequest() {
    switch (this.deleteModule) {
      default:
        this.dialogRef.close(true);
        break;
    }
  }

  cancel() {
    console.log('Delete action cancelled');
  }
}
