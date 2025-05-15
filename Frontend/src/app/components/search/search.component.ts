import {Component, inject} from '@angular/core';
import {SceneComponent} from "../scene/scene.component";
import {FormsModule} from "@angular/forms";
import {TravelService} from "../../services/travel.service";
import {TripReplyDto} from "../../DTO/tripReplyDto";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SearchDto} from "../../DTO/search.dto";
import {Planet,PlanetanetNames} from "../../enums/planet.enum";
import {CardComponent} from "../card/card.component";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        SceneComponent,
        FormsModule,
        MatSnackBarModule,
        CardComponent
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    snackBar = inject(MatSnackBar);
    travelService = inject(TravelService);
    results: TripReplyDto[] = [];
    departure: string = '';
    arrive: string = '';
    planetOptions = Object.values(Planet);
    searchData: SearchDto = {
        depart: '',
        arrive: ''
    };
    protected readonly PlanetanetNames = PlanetanetNames;

    onSearch() {
        if (this.departure === this.arrive) {
            this.showSnackBar('Departure and arrival must be different', 'error');
            this.results = [];
            return;
        }
        if (!this.departure || !this.arrive) {
            this.showSnackBar('Please select both departure and arrival.', 'error');
            this.results = [];
            return;
        }
        if (this.departure && this.arrive) {
            this.searchData.arrive = this.arrive;
            this.searchData.depart = this.departure;
            this.travelService.search(this.searchData).subscribe(
                (data: TripReplyDto[]) => {

                    if (data && data.length > 0) {
                        this.results = data;
                        this.showSnackBar('Trips found successfully!', 'success');
                    } else {
                        this.results = [];
                        this.showSnackBar('This trip is not available.', 'warning');
                    }
                },
                (error) => {
                    this.results = [];
                    this.showSnackBar('An error occurred during the search.', 'error');
                }
            );
        }
    }

    private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
        this.snackBar.open(message, 'close', {
            duration: 3000,
            panelClass: [`snackbar-${type}`],
            verticalPosition: 'top',
            horizontalPosition: 'right',
        })
    }

    handleReserver(result: TripReplyDto) {
        this.travelService.reserveTrip(result,()=>{
            this.showSnackBar('trip reserved', 'success');
        })
    }
}