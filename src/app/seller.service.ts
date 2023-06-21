import { EventEmitter, Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { LogIn, SignUp } from './data-type';
import { BehaviorSubject } from 'rxjs';
import{Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }
// isSellerLoggedIn= new BehaviorSubject<boolean>{false:any}
  constructor(private http:HttpClient ,private router:Router) { }
  isLoginError=new EventEmitter<boolean>(false)
  userSignUp(data:SignUp){
       return this.http.post('http://localhost:3000/seller',data);
  }
  userLogIn(data:LogIn){
//console.warn(data);
return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`);
  }
 
}
