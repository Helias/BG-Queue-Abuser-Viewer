import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  readonly values$: BehaviorSubject<Filters>;

  constructor() {
    this.values$ = new BehaviorSubject<Filters>({
      currentPage: 1,
      entriesPerPage: 20
    });
  }

  setState(filter: Filters): void {
    this.values$.next({
      currentPage: filter.currentPage,
      entriesPerPage: filter.entriesPerPage,
      nameFilter: filter.nameFilter
    });
  }
}

export interface Filters {
  currentPage: number;
  entriesPerPage: number;
  nameFilter?: string;
}
