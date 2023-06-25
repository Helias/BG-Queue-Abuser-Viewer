import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, MatButtonModule, MatIconModule, NoopAnimationsModule],
      declarations: [LegendComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the legend button', () => {
    expect(debugElement.query(By.css('.legend-button'))).toBeTruthy();
  });

  it('should show the legend when clicking on the corresponding button', () => {
    fixture.detectChanges();
    debugElement.query(By.css('.legend-button')).triggerEventHandler('click');
    fixture.detectChanges();

    const legend = debugElement.query(By.css('.legend__title'));
    expect(legend).toBeTruthy();

    const yellowDot = debugElement.query(By.css('.dot--yellow'));
    expect(yellowDot).toBeTruthy();

    expect(getComputedStyle(yellowDot.nativeElement).backgroundColor).toBe('rgb(255, 204, 24)');
  });
});
