import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../data-type';
import{faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productmessage:undefined | string;
  icon=faTrash;
  edit=faEdit;
constructor(private product:ProductService){}
ngOnInit(): void {
  this.list();

 
}
deleteProduct(id:number){
  
   this.product.deleteProduct(id).subscribe((result)=>{
        if(result){
          window.alert("Are you sure you want to remove?");
         this.productmessage="Your Product has been Deleted";
         this.list();
        }
   }) 
   setTimeout(()=>{
    this.productmessage=undefined
   },3000)
}
list(){
  this.product.productList().subscribe((result:any)=>{
     this.productList=result;
       })
}

}
