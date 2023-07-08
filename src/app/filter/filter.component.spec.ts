import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './filter.component';
import { Filters } from './filter.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  const initialState = {
    currentPage: 1,
    entriesPerPage: 20,
    nameFilter: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the right initial state', () => {
    expect(component.filterForm.value).toEqual(initialState);
  });

  it('should update filter state', () => {
    const defaultFilter: Filters = {
      currentPage: 2,
      entriesPerPage: 50
    };

    const filters: ReadonlyArray<Required<typeof component.filterForm.value>> = [
      {
        ...defaultFilter,
        nameFilter: null
      },
      {
        ...defaultFilter,
        nameFilter: 'test'
      }
    ];

    filters.forEach(filter => {
      component.filterForm.setValue(filter);
      component.updateFilters();

      expect(component.filterForm.value).toEqual(filter);
    });
  });
});
