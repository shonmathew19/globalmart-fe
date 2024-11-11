import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }
  loginUserName: any = '';
  wishlistCount = 0;
  cartCount = 0;
  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.apiService.getWishlistCount()
      this.loginUserName = sessionStorage.getItem('username')
      this.apiService.wishlistCount.subscribe((res: any) => {
        this.wishlistCount = res;
      })
      this.apiService.getCartCount()
      this.apiService.cartCount.subscribe((res:any)=>{
        this.cartCount=res;
      })
    }

    else {
      this.loginUserName = ''
    }
  }
  logout() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    // this.router.navigateByUrl('/user/login')
  }

}
