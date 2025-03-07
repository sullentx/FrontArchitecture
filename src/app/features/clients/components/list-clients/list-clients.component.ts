import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client.interface';
import { ClientGetAll } from '../../api/client.get';
import { MatDialog } from '@angular/material/dialog';
import { ClientGetOne } from '../../api/client.getOne';
import { ClientPut } from '../../api/client.put';
import { DeleteClient } from '../../api/client.delete';
import { ClientEditDialogComponent } from '../client-edit-dialog/client-edit-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientDialogSendNotificationComponent } from '../client-dialog-send-notification/client-dialog-send-notification.component';
import { NotificationPost } from '../../api/notification.post';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent  implements OnInit{
    clients: Client[] = [];
  constructor(private getClient:ClientGetAll,
    private dialog: MatDialog,
    private clientPut: ClientPut,
    private clientDelete:DeleteClient,
    private snackBar: MatSnackBar,
    private notificationPost: NotificationPost
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.getClient.getClients().subscribe(data => {
      this.clients = data;}
    );
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      width: '400px',
      data: client
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientPut.updateClient(result.id, result).subscribe(
          () => {
            this.loadClients();
            this.snackBar.open('Cliente actualizado con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          },
          (error) => {
            console.error('Error al actualizar el cliente:', error);
            this.snackBar.open('No se pudo actualizar el cliente', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            });
          }
        );
      }
    });
  }
  
  deleteClient(id: number): void {
    console.log(id);
    this.clientDelete.deleteClient(id).subscribe(
      () => {
        this.loadClients();
        this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        console.error('Error al eliminar el cliente:', error);
        this.snackBar.open('No se pudo eliminar el cliente', 'Cerrar', {
          duration: 5000, 
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  sendNotification(client: Client): void {
    const dialogRef = this.dialog.open(ClientDialogSendNotificationComponent, {
      width: '400px',
      data: client
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notificationPost.createNotification(result).subscribe(
          () => {
            this.snackBar.open('Notificación enviada con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          },
          (error) => {
            console.error('Error al enviar la notificación:', error);
            this.snackBar.open('No se pudo enviar la notificación', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            });
          }
        );
      }
    });
  }

}

