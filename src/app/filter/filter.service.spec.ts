import { fakeAsync, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Filters } from './filter.model';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should have values$', () => {
    expect(service.values$).toBeDefined();
    expect(service.values$).toBeInstanceOf(BehaviorSubject<Filters>);
  });

  it('values$ have the right values', fakeAsync(() => {
    service.values$.subscribe(values => {
      expect(values).toEqual({
        currentPage: 1,
        entriesPerPage: 20
      });
    });
  }));

  it('should have setState', () => {
    expect(service.setState).toBeDefined();
    expect(service.setState).toBeInstanceOf(Function);
  });

  it('should update state successfully', fakeAsync(() => {
    const before: Filters = {
      currentPage: 1,
      entriesPerPage: 20
    };

    const after: Filters = {
      currentPage: 2,
      entriesPerPage: 50,
      nameFilter: 'test'
    };

    let state = before;
    service.values$.subscribe(values => {
      expect(values).toEqual(state);
    });

    state = after;
    service.setState(after);
  }));
});
