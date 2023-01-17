import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { product } from './modules/products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  allProducts: product[]=[]

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.fetchProducts()
  }

  onProductFetch(){
    this.fetchProducts()
  }

  onProductCreate(products: {pName: string, dese:string, price:string}){
    console.log(products)
    const header = new HttpHeaders({'myHeader': 'testing'})
    this.http.
    post<{name: string}>('https://angulartest-af804-default-rtdb.firebaseio.com/products.json', 
    products,{headers: header}).subscribe((res)=>{
      console.log(res)
    })
  }

  private fetchProducts(){
    this.http.get<{[key:string]:product}>('https://angulartest-af804-default-rtdb.firebaseio.com/products.json'
    ).pipe(map((res)=>{
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key],id: key})
        }
      }
      return products
    }))
    .subscribe((product)=>{
      console.log(product)
      this.allProducts = product
    })
  }
}
