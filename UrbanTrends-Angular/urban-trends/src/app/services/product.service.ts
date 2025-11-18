import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

//The service instance is created only once when the app starts

//Every component that injects ProductSerive gets the same instance.

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
}
