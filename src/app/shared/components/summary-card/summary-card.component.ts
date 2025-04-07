import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input() summaries: { name: string; value: number }[] = [];
}
