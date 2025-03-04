import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable ({
    providedIn: 'root'
})

export class DeleteClient {        
    API_URL= envionment.clientsUrl

    constructor(private http: HttpClient) { }
    
    deleteClient(id: number){        
        return this.http.delete(`${this.API_URL}/${id}`);
        }
    
}