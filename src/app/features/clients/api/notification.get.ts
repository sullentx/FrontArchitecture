// notification.get.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, interval, of } from "rxjs";
import { catchError, switchMap, takeWhile, finalize, map } from "rxjs/operators";
import { envionment } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class NotificationGet {
  private API_URL = envionment.notificationsUrlConsumer;

  constructor(private http: HttpClient) { }


  getAllNotifications(): Observable<any> {
    return this.http.get(`${this.API_URL}`).pipe(
      map((response: any) => {
        if (response && response.Notificaciones) {
          return response.Notificaciones;
        }
        return [];
      }),
      catchError(error => {
        console.error('Error obteniendo notificaciones:', error);
        return throwError(() => error);
      })
    );
  }
  

  getClientNotifications(clientId: number): Observable<any[]> {
    return this.getAllNotifications().pipe(
      map(notifications => {
        return notifications.filter((n: any) => n.client_id === clientId);
      })
    );
  }

  /**
   * @param clientId e
   * @param maxAttempts 
   * @param initialTimestamp 
   */
  pollForNewNotifications(
    clientId: number, 
    maxAttempts: number = 10, 
    intervalTime: number = 2000
  ): Observable<any[]> {
    const initialTimestamp = new Date().getTime();
    let attempts = 0;
    
    return interval(intervalTime).pipe(
      switchMap(() => {
        attempts++;
        console.log(`Intento ${attempts} de verificar notificaciones`);
        
        return this.getClientNotifications(clientId).pipe(
          map(notifications => {
            return notifications.filter((n: any) => {
              if (n.timestamp) {
                const notificationTime = new Date(n.timestamp).getTime();
                return notificationTime > initialTimestamp;
              }
              return attempts <= 2;
            });
          }),
          catchError(error => {
            console.error(`Error en intento ${attempts}:`, error);
            return of([]);
          })
        );
      }),
      takeWhile((notifications) => {
        return notifications.length === 0 && attempts < maxAttempts;
      }, true), 
      finalize(() => {
        console.log(`Short polling finalizado después de ${attempts} intentos`);
      })
    );
  }
  
 
  checkForNotifications(clientId: number): Observable<any[]> {
    return this.getClientNotifications(clientId);
  }
}