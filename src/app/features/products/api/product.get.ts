import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Product } from "../interfaces/Product.interface";
import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";

@Injectable({
    providedIn: 'root'
  })

export class ProductGet {
    private API_URL = envionment.productsUrl

    constructor(private http: HttpClient) { }
    getProducts(): Observable<Product[]> {
        return this.http.get<{ 'Lista de productos': Product[] }>(this.API_URL).pipe(
          map(response => response['Lista de productos'] || [])
        );
      }
}