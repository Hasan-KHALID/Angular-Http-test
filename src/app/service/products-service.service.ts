import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../modules/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private http: HttpClient) { }


  createProduct(products: {pName: string, dese:string, price:string} ){
    console.log(products)
    const header = new HttpHeaders({'myHeader': 'testing'})
    this.http.
    post<{name: string}>('https://angulartest-af804-default-rtdb.firebaseio.com/products.json', 
    products,{headers: header}).subscribe((res)=>{
      console.log(res)
    })
  }

  fetchProduct(){

  }

  deleteProduct(){

  }

  updateProducts(id: string, value){
    this.http.put('https://angulartest-af804-default-rtdb.firebaseio.com/products/'+id+'.json', value)
    .subscribe()
  }

}


