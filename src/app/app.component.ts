import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { product } from './modules/products';
import { ProductsServiceService } from './service/products-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  allProducts: product[]=[];
  isFetching: boolean = false;
  editMode: boolean=false
  currentProductId: string;
  @ViewChild('productsForm') form:NgForm;

  constructor(private http: HttpClient, private productService: ProductsServiceService){}

  ngOnInit(){
    this.fetchProducts()
  }

  onProductFetch(){
    this.fetchProducts()
  }

  onProductCreate(products: {pName: string, dese:string, price:string}){
    if(!this.editMode){
      this.productService.createProduct(products)
    }
    else{
      this.productService.updateProducts(this.currentProductId, products)
    }
  }

  private fetchProducts(){
    this.isFetching= true
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
      this.isFetching =false
    })
  }

  onDeleteProduct(id:string){
    this.http.delete
    ('https://angulartest-af804-default-rtdb.firebaseio.com/products/'+id+'.json')
    .subscribe();
  }

  allDelete(){
    this.http.delete
    ('https://angulartest-af804-default-rtdb.firebaseio.com/products/.json')
    .subscribe();
  }

  onEditClick(id: string){
    this.currentProductId = id
    let currentProduct= this.allProducts.find((p)=>{
      return p.id===id
    })
    console.log(currentProduct)
    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price
    })
    this.editMode =true
  }


}
