import { Component, Inject, OnInit, } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Notification } from '../../interfaces/Notificaction.interface';

@Component({
  selector: 'app-client-dialog-send-notification',
  standalone: true,
  imports: [MatDialogModule,],
  templateUrl: './client-dialog-send-notification.component.html',
  styleUrl: './client-dialog-send-notification.component.css'
})
export class ClientDialogSendNotificationComponent implements OnInit{
  notificationForm: FormGroup
  constructor(private fb:FormBuilder,
    private dialogRef: MatDialogRef<ClientDialogSendNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification
  ){
    this.notificationForm = this.fb.group({
      id: [data.id],
      client_id: [data.client_id,Validators.required],
      content: [data.content,Validators.required],
    })
  }

  ngOnInit(): void {
      
  }

  sendNotification(id:number,content:string):void{
    
  }

}


