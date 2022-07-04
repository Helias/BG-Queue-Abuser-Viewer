import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { FilterValue } from './filter/filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private currentData: Row[] = [];
  private filterValue: FilterValue = {
    currentPage: 0,
    entriesPerPage: 25,
    nameFilter: undefined
  };

  readonly title = 'BG Queue Abuser Viewer';
  readonly displayedColumns: readonly (keyof Row)[] = Object.freeze([
    'guid',
    'account',
    'name',
    'level',
    'type',
    'datetime'
  ]);
  readonly typeColors: readonly { color: string; tooltip: string }[] = Object.freeze([
    {
      color: 'blue',
      tooltip: 'The player abandoned the BG (deserter)'
    },
    {
      color: 'grey',
      tooltip:
        'The player is kicked out from the BG after being offline (deserter or player crashed)'
    },
    {
      color: 'red',
      tooltip:
        'The player is invited to join BG but he refused, he clicked Leave Queue (queue abuser)'
    },
    {
      color: 'orange',
      tooltip:
        "The player is invited to join BG but he doesn't click on any button and the time expires (AFK or queue abuser)"
    },
    {
      color: 'yellow',
      tooltip:
        'The player is invited to join BG but in that time he logs out (queue abuser or the player just logged out)'
    }
  ]);

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
        tap(res => {
          this.currentData = res as Row[];
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

interface Row {
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
