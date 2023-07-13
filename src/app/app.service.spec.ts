import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { APIResults, Row } from './app.model';
import { AppService } from './app.service';
import { Filters } from './filter/filter.model';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;
  let rows: ReadonlyArray<Row>;

  const defaultFilters: Filters = {
    currentPage: 1,
    entriesPerPage: 20
  };

  const sendingRow: APIResults = {
    guid: 1,
    type: 1,
    account: 1,
    name: 'test',
    level: 1,
    race: 1,
    class: 1,
    gender: 1,
    datetime: '2023/04/02'
  };

  const formatter = Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'long'
  });

  const resultingRow: APIResults & { position: number } = {
    ...sendingRow,
    datetime: formatter.format(new Date(sendingRow.datetime)),
    position: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get the data', fakeAsync(() => {
    service.getData(defaultFilters).subscribe(data => {
      rows = data;
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8080/api/characters/battleground_deserters/${
        defaultFilters.entriesPerPage
      }?from=${defaultFilters.currentPage - 1}`
    );

    req.flush([sendingRow]);

    flush();

    expect(req.request.method).toEqual('GET');

    expect(rows).toBeTruthy();

    expect(rows.length).toBe(1);

    expect(rows[0]).toEqual(resultingRow);
  }));

  it('should get the data,with name filter', fakeAsync(() => {
    const filter: Required<Filters> = {
      ...defaultFilters,
      nameFilter: 'test'
    };

    service.getData(filter).subscribe(data => {
      rows = data;
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8080/api/characters/battleground_deserters/${filter.entriesPerPage}?from=${
        filter.currentPage - 1
      }${filter.nameFilter ? '&name=' + filter.nameFilter : ''}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush([sendingRow]);

    flush();

    expect(rows).toBeTruthy();

    expect(rows.length).toBe(1);

    expect(rows[0]).toEqual(resultingRow);

    expect(rows[0].name).toMatch(`.*${filter.nameFilter}.*`);
  }));
});
