import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
  ) {}

  getOrder(userId: number): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(`${this.apiUrl}/user/${userId}`)
      ;
  }

  placeOrder(userId: number): Observable<Order> {
    console.log('Placing order for userId:', userId);

    return this.httpClient
      .post<any>(`${this.apiUrl}/${userId}`, null)
  }

  cancelOrder(orderId: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}/${orderId}`);
}

}
