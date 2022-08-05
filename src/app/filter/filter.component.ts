import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters, FiltersFormGroup } from './filter.model';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filterForm: FormGroup;

  constructor(private readonly filterService: FilterService) {
    const filterValues: Filters = this.filterService.values$.value;

    this.filterForm = new FormGroup<FiltersFormGroup>({
      currentPage: new FormControl<Filters['currentPage']>(filterValues.currentPage),
      entriesPerPage: new FormControl<Filters['entriesPerPage']>(filterValues.entriesPerPage),
      nameFilter: new FormControl<Filters['nameFilter']>(filterValues.nameFilter)
    });
  }

  updateFilters(): void {
    const { currentPage, entriesPerPage, nameFilter }: Filters = this.filterForm.value;
    this.filterService.setState({ currentPage, entriesPerPage, nameFilter });
  }
}
