import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchDto} from "../DTO/search.dto";
import {Observable} from "rxjs";
import {SearchReplyDto} from "../DTO/searchReply.dto";
import {CurrentTravelsReplyDto} from "../DTO/getCurrentTravels.Reply.dto";

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  currentTravels = "api/v1/currentTravels";

  constructor(public http: HttpClient) {
  }

  getCurrentTravels(): Observable<CurrentTravelsReplyDto[]> {
    return this.http.get<CurrentTravelsReplyDto[]>(this.currentTravels);
  }
}
