import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../interfaces/Client.interface';

@Component({
  selector: 'app-client-edit-dialog',
  standalone: true,
   imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule
    ],
  templateUrl: './client-edit-dialog.component.html',
  styleUrl: './client-edit-dialog.component.css'
})
export class ClientEditDialogComponent implements OnInit {
  clientForm: FormGroup;
  constructor(private fb:FormBuilder,
    private dialogRef: MatDialogRef<ClientEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
    this.clientForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      last_name: [data.last_name, [Validators.required,]],
      email: [data.email, [Validators.required, Validators.email]],
  })


}

ngOnInit(): void {
    
}
 save():void{
    if(this.clientForm.valid){
      this.dialogRef.close(this.clientForm.value);
    }
 }

  close(): void {
    this.dialogRef.close();
  }
}
