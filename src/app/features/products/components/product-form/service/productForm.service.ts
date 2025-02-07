import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  patchForm(form: FormGroup, product: Product): void {
    form.patchValue(product);
  }

  resetForm(form: FormGroup): void {
    form.reset({
      id: null,
      name: '',
      price: 0,
      quantity: 0
    });
  }
}