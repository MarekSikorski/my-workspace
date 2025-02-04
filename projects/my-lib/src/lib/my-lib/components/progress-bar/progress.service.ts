import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private progressTitle = new BehaviorSubject<string | null>(null);
  title$ = this.progressTitle.asObservable();

  private progressSource = new BehaviorSubject<number | null>(null);
  progress$ = this.progressSource.asObservable();

  setTitle(title: string){
    this.progressTitle.next(title);
  }

  startProgress() {
    this.progressSource.next(0);
  }

  setProgress(value: number) {
    this.progressSource.next(value);
  }

  completeProgress() {
    this.progressSource.next(null);
    this.progressTitle.next(null);
  }
}
