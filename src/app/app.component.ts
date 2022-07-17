import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
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
  dataSource = new MatTableDataSource<Row>(this.currentData);

  @ViewChild(MatTable) table!: MatTable<Row>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly http: HttpClient) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.getDataAndRefresh();
  }

  private getData(): Observable<Object> {
    return this.http
      .get<APIResults[]>(
        `api/characters/battleground_deserters/${this.filterValue.entriesPerPage}?from=${
          this.filterValue.currentPage * this.filterValue.entriesPerPage
        }${this.filterValue.nameFilter ? '&name=' + this.filterValue.nameFilter : ''}`
      )
      .pipe(
        tap(obj => {
          this.currentData = obj.map((res, index) => {
            const newRow: Row = {
              ...res,
              position: index + 1 + this.filterValue.currentPage * this.filterValue.entriesPerPage
            };

            const datetime = new Date(newRow.datetime);
            const formatter = Intl.DateTimeFormat(undefined, {
              dateStyle: 'short',
              timeStyle: 'long'
            });
            newRow.datetime = formatter.format(datetime);

            return newRow;
          });
        })
      );
  }

  private refreshTable(): void {
    this.dataSource.data = this.currentData;
  }

  private getDataAndRefresh(): void {
    if (!this.loading) {
      this.loading = true;
    }

    this.getData().subscribe({
      next: () => {
        this.refreshTable();
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onFilterChange(value: FilterValue): void {
    this.filterValue = value;
    this.getDataAndRefresh();
  }
}

interface APIResults {
  guid: number;
  type: number;
  datetime: string;
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
