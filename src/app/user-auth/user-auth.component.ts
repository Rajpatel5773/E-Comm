import { Component, OnInit } from '@angular/core';
import { LogIn, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService, private product:ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload;
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  logIn(data: LogIn) {
    this.user.userLogIn(data);
    this.user.invaliduserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter a valid user details"
      } else {
        this.localCartToRemoteCart();
      }
    })
  }
  openLogIn() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      
      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
       setTimeout(()=>{
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
       },500)
      })

    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000);
  }

}
