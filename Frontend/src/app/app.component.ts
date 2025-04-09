import { Component } from '@angular/core';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SceneComponent} from "./components/scene/scene.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        SceneComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spacex';
}
