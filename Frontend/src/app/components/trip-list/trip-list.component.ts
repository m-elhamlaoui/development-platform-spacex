
import { Component, inject } from '@angular/core';
import { Travel } from '../../model/Travel';
import { ExploreService } from '../../services/explore.service';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent {

  travels: Travel[] = [];
  exploreService = inject(ExploreService)

  ngOnInit(): void {
    this.getTravels();
  }

  getTravels(): void {
    this.exploreService.getExploredTravels().subscribe((data: Travel[]) => {
      this.travels = data;
    });
  }

  onCardButtonClick(action: string): void {
    console.log('Button clicked:', action);
  }
}

