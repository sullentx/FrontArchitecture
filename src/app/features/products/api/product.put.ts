import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product.interface';
import { envionment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductPut {
  API_URL = envionment.productsUrl

  constructor(private http: HttpClient) { }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }
}