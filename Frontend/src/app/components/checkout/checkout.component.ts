import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {CurrencyPipe, NgIf} from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- For the spinner
import { MatIconModule } from '@angular/material/icon'; // <-- For the icon

import { PaymentData } from "../../models/CheckoutModel";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'] // note styleUrls with an "s"
})
export class CheckoutComponent implements OnInit {

  payment = new PaymentData();

  // Flags to control our three states
  isPaymentInProgress = false;
  isPaymentDone = false;
  price : number = 0;

  basket = inject(BasketService);

  ngOnInit(): void {
    this.payment.amount = this.basket.getTotalPrice();
  }

  onSubmit() {
    if (this.isFormValid()) {
      // Hide the form, show the spinner
      this.isPaymentInProgress = true;

      // Simulate 3s waiting, e.g. for server confirmation
      setTimeout(() => {
        this.isPaymentInProgress = false;
        this.isPaymentDone = true;
      }, 3000);

    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  isFormValid(): boolean {
    return (
        this.payment.cardHolderName.trim().length > 0 &&
        this.payment.cardNumber.trim().length > 0 &&
        this.payment.expDate.trim().length > 0 &&
        this.payment.cvv.trim().length > 0
    );
  }
}
