import { Component } from '@angular/core';
import { typeColors } from '../colors/colors.model';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {
  readonly typeColors = typeColors;
}
