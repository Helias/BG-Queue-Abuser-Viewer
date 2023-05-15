import { TestBed, waitForAsync } from '@angular/core/testing';
import { Filters } from './filter.model';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should have the right default values', () => {
    service.values$.subscribe(values => {
      expect(values).toEqual({
        currentPage: 1,
        entriesPerPage: 20
      });
    });
  });

  it('should update state successfully', waitForAsync(() => {
    const before: Filters = {
      currentPage: 1,
      entriesPerPage: 20
    };

    let state = before;

    service.values$.subscribe(values => {
      expect(values).toEqual(state);
    });

    const after: Filters = {
      currentPage: 2,
      entriesPerPage: 50,
      nameFilter: 'test'
    };

    state = after;

    service.setState(after);
  }));
});
