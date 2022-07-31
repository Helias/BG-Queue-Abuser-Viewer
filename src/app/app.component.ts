import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { Filters, FilterService } from './filter/filter.service';
import { typeColors } from './legend/legend.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private currentData: Row[] = [];

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

  constructor(private readonly http: HttpClient, private readonly filterService: FilterService) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.filterService.values$.pipe(map((filters: Filters) => this.getData(filters))).subscribe({
      next: rows$ => {
        rows$.subscribe(rows => {
          this.currentData = rows;
          this.refreshTable();

          this.loading = false;
        });
      },
      error: e => {
        console.error(e);
      }
    });
  }

  private getData(filters: Filters): Observable<Row[]> {
    if (!this.loading) {
      this.loading = true;
    }

    return this.http
      .get<APIResults[]>(
        'http://localhost:3000/' +
          `api/characters/battleground_deserters/${filters.entriesPerPage}?from=${
            (filters.currentPage - 1) * filters.entriesPerPage
          }${filters.nameFilter ? '&name=' + filters.nameFilter : ''}`
      )
      .pipe(
        map(obj => {
          return obj.map((res, index) => {
            const newRow: Row = {
              ...res,
              position: index + 1 + (filters.currentPage - 1) * filters.entriesPerPage
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
