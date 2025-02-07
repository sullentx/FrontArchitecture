import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "process";
import { envionment } from "../../../../environments/environments";
import { map, Observable } from "rxjs";
import { Product } from "../interfaces/Product.interface";

@Injectable({
    providedIn: 'root'
  })


export class ProductGetOne{
    API_URL = envionment.productsUrl
    constructor (private http:HttpClient){

    }
    getProduct(id: number): Observable<Product> {
        return this.http.get<{ Producto: Product }>(`${this.API_URL}/${id}`).pipe(
          map(response => response.Producto)
        );
      }
}
    