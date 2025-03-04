import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { Client } from "../interfaces/Client.interface";
import { map, Observable } from "rxjs";

@Injectable ({
    providedIn: 'root' })

export class ClientGetAll {
    private API_URL = envionment.clientsUrl

    constructor(private http: HttpClient) { }

    getClients():Observable<Client[]> {
        return this.http.get<({'Clientes': Client[]})>(this.API_URL).pipe(
            map(response => response['Clientes'] || []
        )
    );
    }
}