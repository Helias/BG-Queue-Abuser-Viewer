import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters, FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filterForm: FormGroup;

  constructor(private readonly filterService: FilterService) {
    const filterValues: Filters = this.filterService.values$.value;

    this.filterForm = new FormGroup({
      currentPage: new FormControl(filterValues.currentPage),
      entriesPerPage: new FormControl(filterValues.entriesPerPage),
      nameFilter: new FormControl(filterValues.nameFilter)
    });
  }

  updateFilters(): void {
    const formValue: Filters = this.filterForm.value;

    const newValue: Filters = {
      currentPage: formValue.currentPage,
      entriesPerPage: formValue.entriesPerPage,
      nameFilter: formValue.nameFilter
    };

    this.filterService.setState(newValue);
  }
}
