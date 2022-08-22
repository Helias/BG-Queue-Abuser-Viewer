import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have values$ Observable', () => {
    expect(service.values$).toBeDefined();
  });

  it('should have the right values', () => {
    service.values$.subscribe(values => {
      expect(values).toEqual({
        currentPage: 1,
        entriesPerPage: 20
      });
    });
  });

  it('should have setState method', () => {
    expect(service.setState).toBeDefined();
  });

  it('should update state successfully', () => {
    service.setState({
      currentPage: 2,
      entriesPerPage: 50,
      nameFilter: 'test'
    });

    service.values$.subscribe(values => {
      expect(values).toEqual({
        currentPage: 2,
        entriesPerPage: 50,
        nameFilter: 'test'
      });
    });
  });
});
