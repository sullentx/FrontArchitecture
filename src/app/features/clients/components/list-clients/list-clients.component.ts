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
import { NotificationGet } from '../../api/notification.get';

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
    private notificationPost: NotificationPost,
    private notificationGet : NotificationGet
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
  // list-clients.component.ts
sendNotification(client: Client): void {
  const dialogRef = this.dialog.open(ClientDialogSendNotificationComponent, {
    width: '400px',
    data: client
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Mostrar mensaje de que se está enviando la notificación
      this.snackBar.open('Enviando notificación...', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.notificationPost.createNotification(result).subscribe(
        () => {
          // Mostrar mensaje de que estamos verificando la entrega
          this.snackBar.open('Notificación enviada, verificando entrega...', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

          // Iniciar short polling para buscar la notificación
          this.notificationGet.pollForNewNotifications(client.id, 5, 2000).subscribe(
            (notifications) => {
              if (notifications && notifications.length > 0) {
                // Notificación encontrada
                this.snackBar.open('Notificación entregada con éxito', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  panelClass: ['success-snackbar']
                });
              } else {
                // No se encontró notificación después de los intentos
                this.snackBar.open('No se pudo confirmar la entrega de la notificación', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  panelClass: ['warning-snackbar']
                });
              }
            },
            (error) => {
              console.error('Error en el polling:', error);
              this.snackBar.open('Error al verificar la entrega', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['error-snackbar']
              });
            }
          );
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

