import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProgressService } from './progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'lib-progress-bar',
  imports: [MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  progress: number | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.progressService.progress$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(progress => {
        this.progress = progress;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
