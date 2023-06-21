import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.css']
})
export class ChekoutComponent implements OnInit {
  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMessage:string|undefined;
  constructor(private product:ProductService,private route:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
     
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quntity){
          price=price+(+item.price* + item.quntity);
        }
        
      })
      this.totalPrice=price+(price/10)+100-(price/10);
      console.warn(this.totalPrice);
      
    })
 
  }
  orderNow(data:{email:string , address:string,name:string,contact:string}){

    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderdata:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
       setTimeout(()=>{
        item.id && this.product.deleteCartItems(item.id)
       },700)
      })
      this.product.orderNow(orderdata).subscribe((result)=>{
        if(result){
           this.orderMessage="Your Order Has been placed"
          // alert(' Your order has been placed');
          
          setTimeout(()=>{
            this.route.navigate(['/my-orders']);
            this.orderMessage=undefined
          },3000)
        }
      })
    }
  
  }
}
