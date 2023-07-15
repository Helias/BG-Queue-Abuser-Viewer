import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let appServiceMock: any;

  beforeEach(async () => {
    appServiceMock = jasmine.createSpyObj('AppService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatMenuModule
      ],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock
        }
      ],
      declarations: [AppComponent, AppFilterStubComponent, AppLegendStubComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
  });

  it('should render title', () => {
    expect(debugElement.query(By.css('.toolbar__title')).nativeElement.textContent).toBe(
      'BG Queue Abuser Viewer'
    );
  });

  it('should render table rows', fakeAsync(() => {
    appServiceMock.getData.and.returnValue(
      of([
        {
          position: 1,
          guid: 1,
          type: 1,
          datetime: '2023/04/02',
          account: 1,
          name: 'test',
          level: 1,
          race: 1,
          class: 1,
          gender: 1
        }
      ])
    );

    fixture.detectChanges();

    expect(appServiceMock.getData).toHaveBeenCalledTimes(1);

    const tableRows = debugElement.queryAll(By.css('.table .mat-column-position'));
    expect(tableRows.length).toBe(2); // Header and first row
  }));

  it('should handle error', fakeAsync(() => {
    const error = new Error('Generic Error');

    appServiceMock.getData.and.rejectWith(error);

    fixture.detectChanges();

    expect(appServiceMock.getData).toHaveBeenCalledTimes(1);

    const tableRows = debugElement.queryAll(By.css('.table .mat-column-position'));
    expect(tableRows.length).toBe(1); // Header only
  }));

  it('should render credits', () => {
    const index = debugElement
      .queryAll(By.css('.credits > a'))
      .findIndex(a => a.nativeElement.href.match(/.*Lorenzo.*/));

    expect(index).toBeGreaterThanOrEqual(0);
  });
});

@Component({ selector: 'app-filter', template: '' })
class AppFilterStubComponent {}
@Component({ selector: 'app-legend', template: '' })
class AppLegendStubComponent {}
