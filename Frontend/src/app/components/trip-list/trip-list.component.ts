import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent {
travels=[
  {depart : 'hhhhhh',
  arrive:'hhhhhh',
  dateDepart:"hhhhh",
  dateArrivee:"hhhhh",
  prix:44

  }
]
}
