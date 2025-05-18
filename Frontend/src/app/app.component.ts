import { Component } from '@angular/core';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SceneComponent} from "./components/scene/scene.component";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        SceneComponent,
        MatCardModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spacex';
}
