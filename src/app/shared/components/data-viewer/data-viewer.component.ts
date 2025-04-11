import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocationChangeService } from '../../services/location-change.service';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CamelToUpperCasePipe } from '../../pipes/camel-to-upper-case.pipe';

function CamelCaseToUpperPipe() {}

@Component({
  selector: 'app-data-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    CamelToUpperCasePipe,
    MatButtonModule,
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
})
export class DataViewerComponent implements OnInit {
  formData: any;
  filteredDetails: Array<{ label: string; value: any }> = [];
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private locationChangeService: LocationChangeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queriedParams: Params) => {
        if (Object.prototype.hasOwnProperty.call(queriedParams, 'action')) {
          this.formData = this.locationChangeService.getRowData();
          this.title = queriedParams['title'] ?? 'Detailed Data';
          this.filterData(this.formData);
        }
      },
    });
  }

  filterData = (formData: { [x: string]: any }): void => {
    const prioritizedFields = ['firstName', 'lastName'];

    this.filteredDetails = Object.keys(formData)
      .filter(
        key =>
          key !== 'postedFlag' &&
          key !== 'modifiedFlag' &&
          key !== 'deletedFlag' &&
          key !== 'status' &&
          key !== 'photoPath' &&
          formData[key] !== null &&
          formData[key] !== 0
      )
      .map(key => {
        return { label: key, value: formData[key] };
      })
      .sort((a, b) => {
        const aPriority = prioritizedFields.indexOf(a.label);
        const bPriority = prioritizedFields.indexOf(b.label);
        return (
          (aPriority === -1 ? Infinity : aPriority) -
          (bPriority === -1 ? Infinity : bPriority)
        );
      });
  };

  onCancel() {
    this.location.back();
  }
}
