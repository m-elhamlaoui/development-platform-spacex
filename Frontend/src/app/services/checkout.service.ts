import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {checkOutPayment} from "../DTO/checkoutPayment.dto";
import {checkOutPaymentReply} from "../DTO/checkoutPayment.reply.dto";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private URL="/api/v1/checkout"

  constructor(private http:HttpClient) { }
  doCheckout(data:checkOutPayment){
    return this.http.post<checkOutPaymentReply[]>(this.URL,data)
  }
}
