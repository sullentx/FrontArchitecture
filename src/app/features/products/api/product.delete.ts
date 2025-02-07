import { Injectable } from "@angular/core";
import { envionment } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })

export class ProductDelete {
    API_URL = envionment.productsUrl

    constructor(private http:HttpClient) { }

    deleteProduct(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`);
    }
}