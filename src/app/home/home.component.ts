import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct:undefined | product[];
  constructor(private products:ProductService){};
  trendy:undefined | product[];
  ngOnInit(): void {
    this.products.popularProducts().subscribe((res)=>{
        this.popularProduct=res;

    });
    this.products.trendyProduct().subscribe((data)=>{
this.trendy=data;
    })

  }
  
}
