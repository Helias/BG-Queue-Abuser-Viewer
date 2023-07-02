import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { APIResults, Row } from './app.model';
import { AppService } from './app.service';
import { Filters } from './filter/filter.model';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;
  let rows: ReadonlyArray<Row>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get the data', fakeAsync(() => {
    const filter: Filters = {
      currentPage: 1,
      entriesPerPage: 20
    };

    service.getData(filter).subscribe(data => {
      rows = data;
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8080/api/characters/battleground_deserters/${filter.entriesPerPage}?from=${
        filter.currentPage - 1
      }`
    );

    expect(req.request.method).toEqual('GET');

    const resultingRow: APIResults = {
      guid: 1,
      type: 1,
      datetime: '2023/04/02',
      account: 1,
      name: 'test',
      level: 1,
      race: 1,
      class: 1,
      gender: 1
    };

    req.flush([resultingRow]);

    flush();

    expect(rows).toBeTruthy();

    expect(rows.length).toBe(1);

    expect(rows[0]).toEqual({
      ...resultingRow,
      datetime: '02/04/2023, 00:00:00 CEST',
      position: 1
    });
  }));

  it('should get the data,with name filter', fakeAsync(() => {
    const filter: Required<Filters> = {
      currentPage: 1,
      entriesPerPage: 20,
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

    const resultingRow: APIResults = {
      guid: 1,
      type: 1,
      datetime: '2023/04/02',
      account: 1,
      name: filter.nameFilter,
      level: 1,
      race: 1,
      class: 1,
      gender: 1
    };

    req.flush([resultingRow]);

    flush();

    expect(rows).toBeTruthy();

    expect(rows.length).toBe(1);

    expect(rows[0]).toEqual({
      ...resultingRow,
      datetime: '02/04/2023, 00:00:00 CEST',
      position: 1
    });

    expect(rows[0].name).toMatch(`.*${filter.nameFilter}.*`);
  }));
});
