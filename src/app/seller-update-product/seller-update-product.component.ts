import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined | product;
  productMessage:undefined|string;
  constructor(private route:ActivatedRoute, private product:ProductService,private my:Router){}
  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    //console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
this,this.productData=data
    })
  }
   submit(data:product){
    if(this.productData){
      data.id=this.productData.id;
    }
     this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has been Updated";
        
      }
     });
     setTimeout(()=>{
      this.productMessage=undefined;
      this.my.navigate(['seller-home'])
     },1200);
     //this.my.navigate(['seller-home'])
   }

}
