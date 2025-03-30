import { Injectable } from "@angular/core";
import { SearchReplyDto } from "../DTO/searchReply.dto";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: SearchReplyDto[] = [];

  addToBasket(flight: SearchReplyDto) {
    this.basket.push(flight);
  }

  removeFromBasket(flight: SearchReplyDto) {
    this.basket = this.basket.filter(f => f !== flight);
  }

  getBasket(): SearchReplyDto[] {
    return this.basket;
  }
}
