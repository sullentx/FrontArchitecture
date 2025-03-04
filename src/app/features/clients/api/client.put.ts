import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Client } from "../interfaces/Client.interface";

@Injectable({
    providedIn: 'root'
  })

  export class ClientPut {
      private API_URL = envionment.clientsUrl
  
      constructor(private http:HttpClient) { }
  
      updateClient(id: number, client: Client) {
          return this.http.put(`${this.API_URL}/${id}`, client);
      }
  }
