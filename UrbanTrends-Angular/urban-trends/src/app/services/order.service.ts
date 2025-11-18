import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';

//The service instance is created only once when the app starts

//Every component that injects OrderService gets the same instance.

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private httpClient: HttpClient, private auth:AuthService) { }

  private getHeaders() {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getOrder(userId:number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/user/${userId}`,  {
      headers: this.getHeaders(),
    });
  }

  // If backend computes totals, accept userId and cart items and let server build the order
 placeOrder(userId: number): Observable<Order> {
  console.log('Placing order for userId:', userId);
  
  return this.httpClient.post<Order>(`${this.apiUrl}/${userId}`, null,  {
      headers: this.getHeaders(),
    });
}



  cancelOrder(orderId: number): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.apiUrl}/${orderId}`,  {
      headers: this.getHeaders(),
    });
  }


}
