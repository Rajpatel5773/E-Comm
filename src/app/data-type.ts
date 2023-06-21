export interface SignUp{
    name:string,
    password:string,
    email:string
}
export interface LogIn{
    password:string,
    email:string
}
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
     image:string,
     id:number,
     quntity:undefined|number,
     productId:undefined|number
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
     image:string,
     id:number | undefined,
     quntity:undefined|number,
     userId:number,
     productId:number
}
 export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
 }
 export interface order{
    name:string,
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
 }