import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private fb: FormBuilder) { }
  checkoutForm = this.fb.group({
    username: ['', [Validators.required]],
    houseName: ['', [Validators.required]],
    place: ['', [Validators.required]],
    landmark: ['']
  })

}
