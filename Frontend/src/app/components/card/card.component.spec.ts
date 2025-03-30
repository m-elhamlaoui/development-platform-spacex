import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-travel-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() travel!: {
    depart: string;
    arrive: string;
    departureDate: string;
    arrivalDate: string;
    price: number;
  };

  @Input() mode: 'add' | 'delete' = 'add';
  @Output() cardAction = new EventEmitter<void>();

  get buttonIcon(): string {
    return this.mode === 'add' ? 'add_shopping_cart' : 'delete';
  }

  get buttonColor(): string {
    return this.mode === 'add' ? 'primary' : 'warn';
  }

  get buttonTooltip(): string {
    return this.mode === 'add' ? 'Add to basket' : 'Remove from basket';
  }

  handleAction() {
    this.cardAction.emit();
  }
}