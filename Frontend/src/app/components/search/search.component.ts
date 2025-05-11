import {Component, inject} from '@angular/core';
import {SceneComponent} from "../scene/scene.component";
import {FormsModule} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {SearchReplyDto} from "../../DTO/searchReply.dto";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SearchDto} from "../../DTO/search.dto";
import {Planet,PlanetanetNames} from "../../enums/planet.enum";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        SceneComponent,
        FormsModule,
        MatSnackBarModule
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    snackBar = inject(MatSnackBar);
    searchService = inject(SearchService);
    results: SearchReplyDto[] = [];
    departure: string = '';
    arrive: string = '';
    planetOptions = Object.values(Planet);
    searchData: SearchDto = {
        depart: '',
        arrive: ''
    };

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
            this.searchService.search(this.searchData).subscribe(
                (data: SearchReplyDto[]) => {

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

    protected readonly PlanetanetNames = PlanetanetNames;
}