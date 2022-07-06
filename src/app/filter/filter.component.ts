import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<FilterValue>();

  currentPage = 1;
  entriesPerPage = 20;
  nameFilter?: string;

  onSubmit() {
    this.filterChange.emit({
      currentPage: this.currentPage - 1, // Subtracting 1 to send correct page index
      entriesPerPage: this.entriesPerPage,
      nameFilter: this.nameFilter
    });
  }
}

export interface FilterValue {
  currentPage: number;
  entriesPerPage: number;
  nameFilter?: string;
}
