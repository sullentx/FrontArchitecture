import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/Product.interface';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      quantity: [data.quantity, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}