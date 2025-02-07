import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../interfaces/Product.interface';
import { ProductFormService } from './service/productForm.service';
import { ProductSaveService } from './service/ProductSave.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() productSaved = new EventEmitter<void>();
  productForm: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private productFormService: ProductFormService,
    private productSaveService: ProductSaveService,
    private router: Router
  ) {
    this.productForm = this.productFormService.createForm();
  }

  ngOnInit(): void {
    if (this.product) {
      this.productFormService.patchForm(this.productForm, this.product);
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.productSaveService.saveProduct(productData).subscribe(() => {
        this.alertMessage = 'Product saved successfully';
        this.alertType = 'success';
        this.productSaved.emit();
      });
    
    }
  }

  resetForm(): void {
    this.productFormService.resetForm(this.productForm);
  }
  Golist(){
    this.router.navigate(['/listaProductos']);
  }
}