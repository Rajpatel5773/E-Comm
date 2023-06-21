import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router'
import { LogIn, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError:string='';
  
  ngOnInit(): void {

  }

  signUp(data: SignUp) {
    // console.warn(data)
    this.seller.userSignUp(data).subscribe((result) => {
      localStorage.setItem('seller', JSON.stringify(result))
      this.router.navigate(['seller-home'])
    })
  }
  logIn(data: LogIn) {
    // console.warn(data)
    this.seller.userLogIn(data).subscribe((result: any) => {
      if (result && result.length) {
        localStorage.setItem('sellerlog', JSON.stringify(result))
        this.router.navigate(['seller-home'])
      } else {
        //alert("Account doesn't exist [Please signUp]");
       this.authError="Email or Password is not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }
  openSignup() {
    this.showLogin = false
  }
}
