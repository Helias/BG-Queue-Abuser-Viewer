import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.getData();
    this.refreshTable();
  }

  getData(pageIndex: number = 0) {
    // this.http.get(``).subscribe(res => {});
  }

  refreshTable() {
    this.table.renderRows();
  }

  onPageChange(pageIndex: number) {
    this.getData(pageIndex);
    this.refreshTable();
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
