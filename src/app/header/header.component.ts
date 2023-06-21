import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems=0;
  constructor(private route: Router, private product: ProductService) { }
  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      //console.warn(val.url)
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.warn("seller area");
          let sellerStore = localStorage.getItem('seller');
          let sellerdata = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerdata.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else {
          //console.warn('outside');
          this.menuType = 'default';
        }
      }
    });
    //for adding to cart 
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
            this.cartItems = items.length;
    })

  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: any) {
    this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])
  }
  userLogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
}
