import { FormControl } from '@angular/forms';

export interface Filters {
  currentPage: number;
  entriesPerPage: number;
  nameFilter?: string;
}

export type FiltersFormGroup = {
  [k in keyof Filters]: FormControl<Filters[k] | null>;
};
