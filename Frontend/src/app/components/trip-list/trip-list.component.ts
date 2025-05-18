import {Component, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TravelService} from "../../services/travel.service";
import {TripReplyDto} from "../../DTO/tripReplyDto";
import {CardComponent} from "../card/card.component";


@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit{
  snackBar = inject(MatSnackBar);
  travelService = inject(TravelService);
  results: TripReplyDto[] = [];

  ngOnInit(): void {
      // get trip data
    this.travelService.getTrips().subscribe(data => {
      this.results = data;
    })
  }

  handleReserver(result: TripReplyDto) {
    this.travelService.reserveTrip(result,()=>{
      this.showSnackBar('trip reserved', 'success');
    })
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
}
