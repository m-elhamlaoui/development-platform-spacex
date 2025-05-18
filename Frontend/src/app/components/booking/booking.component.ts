import {Component, inject, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TravelService} from "../../services/travel.service";
import {TripReplyDto} from "../../DTO/tripReplyDto";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router} from "@angular/router";



@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon,
    MatFabButton
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  travelService = inject(TravelService);
  results: TripReplyDto[] = [];

  ngOnInit(): void {
      this.refreshList();
  }

  handleRetirer(result: TripReplyDto) {
    this.travelService.removeTrip(result,()=>{
      this.showSnackBar('trip removed', 'success');
      this.refreshList();
    })
  }

  private refreshList(){
    this.results = this.travelService.getReservedTrips();
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

  protected checkout(){
    this.router.navigate(['/precessPayment']);
  }
    navigateToSearch() {
  this.router.navigate(['/liste_voyages']);
}
}
