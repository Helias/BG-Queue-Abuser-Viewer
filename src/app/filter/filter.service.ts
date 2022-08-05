import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  readonly values$ = new BehaviorSubject<Filters>({
    currentPage: 1,
    entriesPerPage: 20
  });

  setState(filter: Filters): void {
    this.values$.next({
      currentPage: filter.currentPage,
      entriesPerPage: filter.entriesPerPage,
      nameFilter: filter.nameFilter
    });
  }
}
