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
  readonly filterForm: FormGroup<FiltersFormGroup>;

  constructor(private readonly filterService: FilterService) {
    const { currentPage, entriesPerPage, nameFilter }: Filters = this.filterService.values$.value;

    this.filterForm = new FormGroup<FiltersFormGroup>({
      currentPage: new FormControl(currentPage),
      entriesPerPage: new FormControl(entriesPerPage),
      nameFilter: new FormControl(nameFilter)
    });
  }

  updateFilters(): void {
    const { currentPage, entriesPerPage, nameFilter } = this.filterForm.value;

    if (currentPage != undefined && entriesPerPage != undefined) {
      this.filterService.setState({
        currentPage,
        entriesPerPage,
        nameFilter: nameFilter ?? undefined
      });
    }
  }
}
