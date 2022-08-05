import { Component } from '@angular/core';
import { ColorAndTooltip } from '../colors/colors.model';
import { ColorsService } from '../colors/colors.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {
  readonly typeColors: ColorAndTooltip = this.colorsService.typeColors;

  constructor(private readonly colorsService: ColorsService) {}
}
