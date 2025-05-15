import { Injectable } from '@angular/core';
import {BasketCreationModel} from "../models/BasketCreationModel";
import {TripReplyDto} from "../DTO/tripReplyDto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  private CREATEBASKETAPI='api/v1/createBasket';
  ID:BasketCreationModel;
  tripList:TripReplyDto[]=[];
  constructor(public http: HttpClient) {
    this.ID = new BasketCreationModel();
    this.ID.basketId ="";
  }

  isSet() {
    return this.ID.basketId!="";
  }

  getId() {
    return this.ID.basketId;
  }

  setId(v: BasketCreationModel) {
    this.ID.basketId=v.basketId;
  }

  setList(newList: TripReplyDto[]) {
    this.tripList=newList;
  }

  createBasket(callback: (id:string) => void){
    this.http
        .post<BasketCreationModel>(this.CREATEBASKETAPI, {})
        .subscribe(v => {
          this.setId(v);
          callback(v.basketId);
          }
        );
  }

  getList():TripReplyDto[] {
    return this.tripList;
  }

  getTotalPrice(): number {
    let price = 0;
    for (let i = 0; i < this.tripList.length; i++) {
      const trip = this.tripList[i];
      if (trip && typeof trip.prix === 'number') {
        price += trip.prix;
      }
    }
    return price;
  }
}
