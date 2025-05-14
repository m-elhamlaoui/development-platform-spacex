import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchReplyDto} from "../DTO/searchReply.dto";
import {SearchDto} from "../DTO/search.dto";
import {BasketCreationModel} from "../models/BasketCreationModel";
import {TripReservationRequest} from "../models/TripReservationRequest";

@Injectable({
    providedIn: 'root'
})

export class TravelService {
    private SEARCHAPI = "api/v1/searchTravel";
    private CREATEBASKETAPI='api/v1/createBasket';
    private DELETEAPI='api/v1/removeFromBasket';
    private RESERVEAPI='api/v1/addToBasket';
    ID:BasketCreationModel = new BasketCreationModel();

    constructor(public http: HttpClient) {
    }

    search(searchDto: SearchDto): Observable<SearchReplyDto[]> {
        return this.http.post<SearchReplyDto[]>(this.SEARCHAPI, searchDto);
    }

    removeTrip(tripinfo: SearchReplyDto, callback:()=>void) {
        return this.http.post(this.DELETEAPI, tripinfo).subscribe(value => {
            callback();
        })
    }

    async reserveTrip(tripinfo: SearchReplyDto,callback:()=>void) {
        var payload = new TripReservationRequest();
        payload.travelId = tripinfo.id;
        if (this.ID.basketId=="") {
            this.createBasket((basketid) => {
                payload.basketId = basketid;
                this.http.post(this.RESERVEAPI, payload).subscribe(value => {
                    callback();
                })
            });
        }else {
            payload.basketId = this.ID.basketId;
            this.http.post(this.RESERVEAPI, payload).subscribe(value => {
                callback();
            })
        }
    }

    createBasket(callback: (id:string) => void){
        this.http
            .post<BasketCreationModel>(this.CREATEBASKETAPI, {})
            .subscribe(v => {
                this.ID = v;
                callback(v.basketId);
            }
        );
    }
}
