import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invaliduserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' }).subscribe((result) => {
      // console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));//save to localstorage
        this.router.navigate(['/']) //redirect to homr page once signup
      }
    })
  }
  userAuthReload() {
      if(localStorage.getItem('user')){
        this.router.navigate(['/'])
      }
  }
  userLogIn(data:LogIn){
this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
.subscribe((result)=>{
  if(result && result.body?.length){
    this.invaliduserAuth.emit(false);
    localStorage.setItem('user', JSON.stringify(result.body[0]));//save to localstorage
  this.router.navigate(['/']) //redirect to homr page once signup
  }else{
    this.invaliduserAuth.emit(true);
  }
  
})
  }
}



