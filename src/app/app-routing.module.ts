import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { PolicyComponent } from './policy/policy.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ChekoutComponent } from './chekout/chekout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'seller-auth',
     component:SellerAuthComponent,
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
   canActivate:[authGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-update/:id',
    component:SellerUpdateProductComponent,
    canActivate:[authGuard]
  },
  {
       path:'search/:query',
       component:SearchComponent
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    path:'policy',
    component:PolicyComponent
  },
  {
    path:'my-cart',
    component:MyCartComponent
  },
  {
    component:ChekoutComponent,
    path:'checkout'
  },
  {
    component:MyOrdersComponent,
    path:'my-orders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
