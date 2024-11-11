import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCartItems: any = [];
  totalPrice = 0;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getAllCartItems()
  }
  getAllCartItems() {
    this.apiService.getAllCartItemsApi().subscribe({
      next: (res) => {
        console.log(res)
        this.allCartItems = res
        this.getTotalPrice()
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  decrementCartProduct(id: any) {
    this.apiService.decrementItemApi(id).subscribe({
      next: (res) => {
        console.log(res)

        this.getAllCartItems()
        this.apiService.getCartCount();

      }, error: (err) => {
        console.log(err)
      }
    })
  }
  incrementCartProduct(id: any) {
    this.apiService.incrementItemApi(id).subscribe({
      next: (res) => {
        console.log(res)

        this.getAllCartItems()
        this.apiService.getCartCount();

      }, error: (err) => {
        console.log(err)
      }
    })
  }
  getTotalPrice() {
    this.totalPrice = 0;
    this.allCartItems.map((item: any) => {
      this.totalPrice = Math.ceil(this.totalPrice + item.grandTotal)
    })


  }
  removeItem(id: any) {
    this.apiService.removeItemApi(id).subscribe({
      next: (res) => {
        console.log(res)

        this.getAllCartItems()
        this.apiService.getCartCount();

      }, error: (err) => {
        console.log(err)
      }
    })
  }

  emptyCart() {
    this.apiService.emptyCartApi().subscribe({
      next: (res) => {
        console.log(res)
        this.getAllCartItems()
        this.apiService.getCartCount();

      }, error: (err) => {
        console.log(err)
      }
    })
  }
  checkout() {
sessionStorage.setItem('totalCartValue',JSON.stringify(this.totalPrice))
  }
}
