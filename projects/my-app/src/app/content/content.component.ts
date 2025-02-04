import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarComponent, ProgressService } from '../../../../my-lib/src/public-api';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-content',
  imports: [ProgressBarComponent, MatButtonModule, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit, OnDestroy {
  title: string | null = '';
  progress: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.title$
      .pipe(takeUntil(this.destroy$))
      .subscribe(title => this.title = title);

    this.progressService.progress$
      .pipe(takeUntil(this.destroy$))
      .subscribe(progress => this.progress = progress);
  }

  start() {
    this.progressService.setTitle('Ladevorgang gestartet...');
    this.progressService.startProgress();
  }

  update() {
    const randomProgress = Math.floor(Math.random() * 100);
    this.progressService.setProgress(randomProgress);
  }

  complete() {
    this.progressService.completeProgress();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
