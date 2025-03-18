import { Component } from '@angular/core';
import {SceneComponent} from "../scene/scene.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SceneComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
