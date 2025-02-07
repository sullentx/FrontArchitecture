import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPost } from '../../../api/product.post';
import { ProductPut } from '../../../api/product.put';
import { Product } from '../../../interfaces/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductSaveService {
  constructor(private productPost: ProductPost, private productPut: ProductPut) {}

  saveProduct(product: Product): Observable<any> {
    if (product.id) {
      return this.productPut.updateProduct(product.id, product);
    } else {
      return this.productPost.createProduct(product);
    }
  }
}