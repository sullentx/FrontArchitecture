import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Notification } from "../interfaces/Notificaction.interface";

@Injectable ({
    providedIn: 'root'
})


export class NotificationPost {
    private API_URL = envionment.notificationsUrl

    constructor(private http: HttpClient){ }

    createNotification(notifiaction:Notification){
        return this.http.post<Notification>(this.API_URL,notifiaction)
    }
}