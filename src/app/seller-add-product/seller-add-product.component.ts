import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  ngOnInit(): void {}
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}
   
submitProduct(data:product){
//console.warn(data);
this.product.addProduct(data).subscribe((result)=>{
if(result){
  this.addProductMessage="product successfully added";
 }setTimeout(()=>this.addProductMessage=undefined,3000);
 
})
}
}
