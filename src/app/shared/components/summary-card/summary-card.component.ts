import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StudentService } from '../../../core/services/student/student.service';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input() summaries: { name: string; value: number }[] = [];
  sampleSummaries = [
    { name: 'Data Processes Runs', value: 32455 },
    { name: 'Students', value: this.studentService.totalRecords() },
    { name: 'Data Generation Runs', value: 34 },
  ];

  constructor(private studentService: StudentService) {
    console.info('Total Records: ', this.studentService.totalRecords());
  }
}
