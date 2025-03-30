import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() origin: string = '';
  @Input() destination: string = '';
  @Input() price: string = '';
  @Input() departureDate: string = '';
  @Input() arrivalDate: string = '';
  @Input() actionButtons: {
    icon: string;
    action: string;
    tooltip?: string;
  }[] = [];

  @Output() buttonClick = new EventEmitter<string>();

  onButtonClick(action: string): void {
    this.buttonClick.emit(action);
  }
}