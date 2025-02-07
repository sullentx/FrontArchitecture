import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product.interface';
import { envionment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductPost {
  API_URL = envionment.productsUrl

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }
}