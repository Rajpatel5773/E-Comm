import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { cart, product } from '../data-type';
ActivatedRoute
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuntity: number = 1;
  removeCart = false;
  cartData:product|undefined;
  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
      /////////add code for get item ////////////
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((items: product) => productId == items.id.toString())
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }


    })
  }
  handleQuntity(val: string) {
    if (this.productQuntity < 20 && val === 'plus') {
      this.productQuntity += 1; //this.productQuntity = this.productQuntity+1;
    } else if (this.productQuntity > 1 && val === 'min') {
      this.productQuntity -= 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quntity = this.productQuntity;
      //console.log(this.productData)
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData, userId, productId: this.productData.id,
        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result) => {
          // console.warn(result)
          if (result) {
            alert('product is added in cart')
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      this.removeCart = false;
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
         this.cartData && this.product.removeToCart(this.cartData.id).subscribe((res)=>{
          if(res){
            this.product.getCartList(userId);
          }
         })
         alert('Product Removed from the cart')
         this.removeCart=false;
    }

  }

}
