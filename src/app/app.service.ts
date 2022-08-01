import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResults, Row } from './app.model';
import { Filters } from './filter/filter.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private readonly http: HttpClient) {}

  getData(filters: Filters): Observable<Row[]> {
    return this.http
      .get<APIResults[]>(
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
}
