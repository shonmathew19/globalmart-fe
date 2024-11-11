import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  //method to call get allProducta api

  getAllproductsApi() {
    return this.http.get(`${this.server_url}/all-products`)
  }

  getProductByIdApi(productId: any) {
    return this.http.get(`${this.server_url}/get-product/${productId}`)
  }

  //login
  userLoginApi(data: any) {
    return this.http.post(`${this.server_url}/user-login`, data)
  }
  //user register

  userRegisterApi(data: any) {
    return this.http.post(`${this.server_url}/user-register`, data)
  }

  // add to wishlist

  addToWishlistApi(data: any) {
    return this.http.post(`${this.server_url}/add-wishlist`, data, this.addTokenToHeader())
  }

  //common function to create a custom header

  addTokenToHeader() {
    // create an object of class HttpHeaders

    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  //get all wishlist items
  getAllWishListItemApi() {
    return this.http.get(`${this.server_url}/allWishListItems`, this.addTokenToHeader())
  }

  //delete wishlist items
  deleteWishlistItemApi(id: any) {
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`, this.addTokenToHeader())
  }

  //create a behaviour subject to share data between components
  wishlistCount = new BehaviorSubject(0)

  getWishlistCount() {
    this.getAllWishListItemApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
  }

  //add to cart
  addToCartApi(data: any) {
    return this.http.post(`${this.server_url}/add-cart`, data, this.addTokenToHeader())
  }

  //get all cart items
  getAllCartItemsApi() {
    return this.http.get(`${this.server_url}/allCartItems`, this.addTokenToHeader())

  }

  //create behaviot subject to  update cart count
  cartCount = new BehaviorSubject(0)

  getCartCount() {
    this.getAllCartItemsApi().subscribe((res: any) => {
      this.cartCount.next(res.length)
    })
  }

  incrementItemApi(id: any) {
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeader())
  }

  decrementItemApi(id: any) {
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeader())
  }

  emptyCartApi(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.addTokenToHeader())
  }

  removeItemApi(id:any){
    return this.http.delete(`${this.server_url}/cart/deleteOne/${id}`,this.addTokenToHeader())
  }
}





