import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable ({
    providedIn: 'root' })

export class ClientGetOne {
    private API_URL = envionment.clientsUrl

    constructor(private http: HttpClient) { }

    getClient(id: number) {
        return this.http.get(`${this.API_URL}/${id}`);
    }
}