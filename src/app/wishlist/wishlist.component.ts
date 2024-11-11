import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  allWishlistItems: any = [];
  ngOnInit(): void {
    this.getAllWishListItems()
  }

  getAllWishListItems() {
    this.apiService.getAllWishListItemApi().subscribe({
      next: (res) => {
        this.allWishlistItems = res;
        console.log('all wishlist items')
        console.log(this.allWishlistItems)
      }
    })
  }
  deleteWishlistItem(id: any) {
    this.apiService.deleteWishlistItemApi(id).subscribe({
      next: (res) => {
        console.log('deleted item')
        console.log(res)
        this.apiService.getWishlistCount()
        this.getAllWishListItems()
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  addToCartItem(data: any) {
    Object.assign(data, { quantity: 1 })
    this.apiService.addToCartApi(data).subscribe({
      next: (res) => {
        Swal.fire({
          text: 'Product successfully added to cart',
          icon: 'success'
        });
        this.deleteWishlistItem(data._id)
        this.apiService.getCartCount();
    
      }, error: (err) => {
        Swal.fire({
          text: `${err}`,
          icon: 'success'
        });
      }
    })
  }
}
