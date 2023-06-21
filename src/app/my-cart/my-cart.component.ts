import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { cart, priceSummary, } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }

  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {

    this.loadDetails();

  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      //  console.log(result)
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quntity) {
          price = price + (+item.price * + item.quntity);
        }

      })
      // console.log(price);
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 20;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 10;
      this.priceSummary.total = price + (price / 10) + 10 - (price / 20);
      // console.warn(this.priceSummary);
      if(this.cartData.length===0){
        this.router.navigate(['/'])
      }

    });
  }
  checkOut() {
    this.router.navigate(['/checkout'])
  }
  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((res) => {
      this.loadDetails();
    })
  }
}
