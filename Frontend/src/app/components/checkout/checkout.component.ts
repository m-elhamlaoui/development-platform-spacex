import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  // Model for payment fields
  payment = {
    amount: 199.99,         // example amount, in your currency
    cardHolderName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  };

  // Example handler for form submission
  onSubmit() {
    if (this.isFormValid()) {
      // In a real application, you would integrate with a payment gateway here.
      console.log('Payment Info:', this.payment);
      alert('Payment submitted!');
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  isFormValid(): boolean {
    // Minimal validation: checks that all fields are filled
    return (
        this.payment.cardHolderName.trim().length > 0 &&
        this.payment.cardNumber.trim().length > 0 &&
        this.payment.expDate.trim().length > 0 &&
        this.payment.cvv.trim().length > 0
    );
  }

}
