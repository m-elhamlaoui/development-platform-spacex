import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    MatFormField,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatButton
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  payment = {
    amount: 199.99,
    cardHolderName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  };

  onSubmit() {
    if (this.isFormValid()) {
      // In a real app, you would integrate with a payment gateway or service here.
      console.log('Payment Info:', this.payment);
      alert('Payment submitted!');
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
