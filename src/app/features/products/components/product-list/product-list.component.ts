import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../interfaces/Product.interface';
import { ProductGet } from '../../api/product.get';
import { ProductDelete } from '../../api/product.delete';
import { ProductPut } from '../../api/product.put';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productGet: ProductGet,
    private productDelete: ProductDelete,
    private productPut: ProductPut,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productGet.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productPut.updateProduct(result.id, result).subscribe(() => {
          this.loadProducts(); // Vuelve a cargar todos los productos después de la actualización
        });
      }
    });
  }

  deleteProduct(id: number): void {
    this.productDelete.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Vuelve a cargar todos los productos después de la eliminación
    });
  }
}