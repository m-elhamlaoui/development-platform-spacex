import {Component} from '@angular/core';
import {SolarSystemComponent} from "../solar-system/solar-system.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        SolarSystemComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
