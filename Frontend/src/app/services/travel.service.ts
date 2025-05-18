import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TripReplyDto} from "../DTO/tripReplyDto";
import {SearchDto} from "../DTO/search.dto";
import {TripReservationRequest} from "../models/TripReservationRequest";
import {BasketService} from "./basket.service";

@Injectable({
    providedIn: 'root'
})

export class TravelService {
    private SEARCHAPI = "api/v1/searchTravel";
    private GETLISTAPI = "api/v1/exploreTravels"
    private DELETEAPI='api/v1/removeFromBasket';
    private RESERVEAPI='api/v1/addToBasket';

    constructor(public http: HttpClient,private basket:BasketService) {}

    search(searchDto: SearchDto): Observable<TripReplyDto[]> {
        return this.http.post<TripReplyDto[]>(this.SEARCHAPI, searchDto);
    }

    getTrips():Observable<TripReplyDto[]> {
        return this.http.get<TripReplyDto[]>(this.GETLISTAPI);
    }

    getReservedTrips():TripReplyDto[]{
        return this.basket.getList()
    }

    removeTrip(tripinfo: TripReplyDto, callback:()=>void) {
        var payload = new TripReservationRequest();
        payload.travelId = tripinfo.id;
        payload.basketId = this.basket.getId();
        return this.http.post<TripReplyDto[]>(this.DELETEAPI, payload).subscribe(newlist => {
            this.basket.setList(newlist);
            callback();
        })
    }

    async reserveTrip(tripinfo: TripReplyDto, callback:()=>void) {
        var payload = new TripReservationRequest();
        payload.travelId = tripinfo.id;
        if (!this.basket.isSet()) {
            this.basket.createBasket((basketid) => {
                payload.basketId = basketid;
                this.http.post<TripReplyDto[]>(this.RESERVEAPI, payload).subscribe(value => {
                    this.basket.setList(value);
                    callback();
                })
            })
        }else {
            payload.basketId = this.basket.getId();
            this.http.post<TripReplyDto[]>(this.RESERVEAPI, payload).subscribe(value => {
                this.basket.setList(value);
                callback();
            })
        }
    }



}
