import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './filter.component';

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

  it('should update filter state without name filter', () => {
    const withoutNameFilter: Required<typeof component.filterForm.value> = {
      currentPage: 2,
      entriesPerPage: 50,
      nameFilter: null
    };

    component.filterForm.setValue(withoutNameFilter);
    component.updateFilters();

    expect(component.filterForm.value).toEqual({
      currentPage: withoutNameFilter.currentPage,
      entriesPerPage: withoutNameFilter.entriesPerPage,
      nameFilter: null
    });
  });

  it('should update filter state with name filter', () => {
    const withNameFilter: Required<typeof component.filterForm.value> = {
      currentPage: 2,
      entriesPerPage: 50,
      nameFilter: 'test'
    };

    component.filterForm.setValue(withNameFilter);
    component.updateFilters();

    expect(component.filterForm.value).toEqual({
      currentPage: withNameFilter.currentPage,
      entriesPerPage: withNameFilter.entriesPerPage,
      nameFilter: withNameFilter.nameFilter
    });
  });
});
