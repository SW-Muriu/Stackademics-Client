import { Component, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { StudentsComponent } from '../../features/students/students.component';
import { Router } from '@angular/router';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { StudentService } from '../../core/services/student/student.service';
import { ReplaySubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    StudentsComponent,
    MatButtonModule,
    SummaryCardComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  summaryData$ = new ReplaySubject<{ name: string; value: number }[]>(1);

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {
    this.summaryData$.next([
      { name: 'Data Processes Runs', value: 0 },
      { name: 'Student Upload Runs', value: 0 },
      { name: 'Data Generation Runs', value: 0 },
      { name: 'Students', value: 0 },
    ]);

    effect(() => {
      const totalStudents = this.studentService.getTotalStudents();
      const totalGenerationRuns = this.studentService.getTotalGenerationRuns();
      const totalProcessRuns = this.studentService.getTotalProcessRuns();
      const uploadRuns = this.studentService.getTotalStudentUploadRuns();
      console.info('Dashboard component:  Do we have the updates here yet?');
      this.updateSummaryData(
        totalStudents,
        totalProcessRuns,
        totalGenerationRuns,
        uploadRuns
      );
      console.info(
        'Updated Value: ',
        this.studentService.getTotalStudentUploadRuns()
      );
    });
  }

  navToDataProcessing = (func?: string): void => {
    this.router.navigate(['dashboard/data/process']).then(() => {});
  };

  navToDataGeneration = (func?: string): void => {
    this.router.navigate(['dashboard/data/generate']).then(() => {});
  };

  updateSummaryData(
    studentsCount: number,
    processRunsCount: number,
    generationRunsCount: number,
    studentUploadRuns: number
  ) {
    this.summaryData$.subscribe(ref => {
      let student = ref.find(c => c.name === 'Students');
      let processRuns = ref.find(c => c.name === 'Data Processes Runs');
      let generationRuns = ref.find(c => c.name === 'Data Generation Runs');
      let uploadRuns = ref.find(c => c.name === 'Student Upload Runs');
      if (student && processRuns && generationRuns && uploadRuns) {
        student.value = studentsCount;
        processRuns.value = processRunsCount;
        generationRuns.value = generationRunsCount;
        uploadRuns.value = studentUploadRuns;
      }
    });
  }
}
