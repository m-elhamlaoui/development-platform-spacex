import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Travel} from "../model/Travel";
@Injectable({
    providedIn: 'root'
})
export class ExploreService {
    exploreEndpoint = "api/v1/exploreTravels";

    constructor(public http: HttpClient) {
    }
    getExploredTravels(): Observable<Travel[]> {
        return this.http.get<Travel[]>(this.exploreEndpoint);
      }

}
