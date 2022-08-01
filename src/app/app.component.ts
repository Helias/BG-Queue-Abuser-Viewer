import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { switchMap, tap } from 'rxjs';
import { Row } from './app.model';
import { AppService } from './app.service';
import { FilterService } from './filter/filter.service';
import { typeColors } from './legend/legend.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
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
  dataSource = new MatTableDataSource<Row>([]);

  @ViewChild(MatTable) table!: MatTable<Row>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly filterService: FilterService,
    private readonly appService: AppService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.filterService.values$
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        switchMap(filters => this.appService.getData(filters))
      )
      .subscribe({
        next: rows => {
          this.dataSource.data = rows;
          this.loading = false;
        },
        error: e => {
          console.error(e);
        }
      });
  }
}
