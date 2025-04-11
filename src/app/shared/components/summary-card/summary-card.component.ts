import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent implements OnInit, OnDestroy {
  @Input() summaries!: ReplaySubject<{ name: string; value: number }[]>;
  studentCount: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.summaries.pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        const studentSummary = data.find(item => item.name === 'Students');
        this.studentCount = studentSummary ? studentSummary.value : 0;
        console.log('Summary Card: Updated the students count');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
