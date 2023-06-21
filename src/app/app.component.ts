import { Component, OnInit } from '@angular/core';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ecomm-project';
  
  ngOnInit(): void {
    
  }
 
}
