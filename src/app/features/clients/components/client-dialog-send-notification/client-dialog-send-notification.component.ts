import { Component, Inject, OnInit, } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Notification } from '../../interfaces/Notificaction.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../interfaces/Client.interface';

@Component({
  selector: 'app-client-dialog-send-notification',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,ReactiveFormsModule,CommonModule
    ,MatButtonModule,MatInputModule
  ],
  templateUrl: './client-dialog-send-notification.component.html',
  styleUrl: './client-dialog-send-notification.component.css'
})
export class ClientDialogSendNotificationComponent implements OnInit{
  notificationForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientDialogSendNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {
    this.notificationForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      
  }

  sendNotification(): void {
    if (this.notificationForm.valid) {
      const notification: Notification = {
        client_id: this.data.id,
        client_name: this.data.name,
        notification_content: this.notificationForm.get('content')?.value
      };
      
      this.dialogRef.close(notification);
    }
  }
  close(): void {
    this.dialogRef.close();
  }

}


