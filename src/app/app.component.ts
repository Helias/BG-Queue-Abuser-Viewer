import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { FilterValue } from './filter/filter.component';
import { typeColors } from './legend/legend.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private currentData: Row[] = [];
  private filterValue: FilterValue = {
    currentPage: 0,
    entriesPerPage: 20
  };

  readonly title = 'BG Queue Abuser Viewer';
  readonly displayedColumns: readonly (keyof Row)[] = Object.freeze([
    'position',
    'guid',
    'account',
    'name',
    'level',
    'type',
    'datetime'
  ]);
  readonly typeColors = typeColors;

  loading = true;
  dataSource: MatTableDataSource<Row> = new MatTableDataSource<Row>(this.currentData);

  @ViewChild(MatTable) table!: MatTable<Row>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.getDataAndRefresh();
  }

  private getData() {
    return this.http
      .get(
        `api/characters/battleground_deserters/${this.filterValue.entriesPerPage}?from=${
          this.filterValue.currentPage * this.filterValue.entriesPerPage
        }${this.filterValue.nameFilter ? '&name=' + this.filterValue.nameFilter : ''}`
      )
      .pipe(
        tap(obj => {
          this.currentData = (obj as APIResults[]).map((res, index) => ({
            ...res,
            position: index + 1 + this.filterValue.currentPage * this.filterValue.entriesPerPage
          }));
        })
      );
  }

  private refreshTable() {
    this.dataSource.data = this.currentData;
  }

  private getDataAndRefresh() {
    if (!this.loading) {
      this.loading = true;
    }

    this.getData().subscribe(() => {
      this.refreshTable();

      this.loading = false;
    });
  }

  onFilterChange(value: FilterValue) {
    this.filterValue = value;
    this.getDataAndRefresh();
  }
}

interface APIResults {
  guid: number;
  type: number;
  datetime: Date;
  account: number;
  name: string;
  level: number;
  race: number;
  class: number;
  gender: number;
}

interface Row extends APIResults {
  position: number;
}
