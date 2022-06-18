import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'BG Queue Abuser Viewer';
  displayedColumns: (keyof Row)[] = ['guid', 'account', 'name', 'level', 'type', 'datetime'];
  entriesPerPage: number = 25;
  currentData: Row[] = [];

  dataSource: MatTableDataSource<Row> = new MatTableDataSource<Row>(this.currentData);

  @ViewChild(MatTable) table!: MatTable<Row>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.onPageChange(0);
  }

  getData(pageIndex: number) {
    return this.http
      .get(
          `api/characters/battleground_deserters/${this.entriesPerPage}?from=${
            pageIndex * this.entriesPerPage
          }&name=${''}`
      )
      .pipe(
        tap(res => {
          this.currentData = res as Row[];
        })
      );
  }

  refreshTable() {
    this.dataSource.data = this.currentData;
  }

  onPageChange(pageIndex: number) {
    this.getData(pageIndex).subscribe(() => {
      this.refreshTable();
    });
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
