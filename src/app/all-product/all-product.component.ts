import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  allProducts: any = []
  ngOnInit(): void {
    this.apiService.getAllproductsApi().subscribe({
      next: (res) => {
        console.log('all products')
        console.log(res)
        this.allProducts = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  addToWishList(product: any) {
    if (sessionStorage.getItem('token')) {

      this.apiService.addToWishlistApi(product).subscribe({
        next: (res: any) => {
          console.log('==== Add to Wishlist Response ===');
          console.log(res);
          this.apiService.getWishlistCount()
          Swal.fire({
            text: 'Product successfully added to wishlist',
            icon: 'success'
          });
        },
        error: (err: any) => {
          Swal.fire({
            text: 'Product is already in wishlist',
            icon: 'warning'
          });
          console.error('Error adding to wishlist:', err);
        }
      });
    } else {
      Swal.fire({
        text: 'Please login',
        icon: 'warning'
      });
    }
  }

  addToCart(product: any) {
    this.apiService.getCartCount();
    if (sessionStorage.getItem('token')) {
      Object.assign(product,{quantity:1})
      this.apiService.addToCartApi(product).subscribe({
        next: (res) => {
          Swal.fire({
            text: 'Product successfully added to cart',
            icon: 'success'
          });
          this.apiService.getCartCount()
        }, error: (err) => {
          Swal.fire({
            text: 'Product is already in cart',
            icon: 'warning'
          });
          console.error('Error adding to cart:', err);
        }
      })
     
    }
    else {
      Swal.fire({
        text: 'Please login',
        icon: 'warning'
      });
    }
  }
}
