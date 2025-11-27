import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { CartAdapter } from '../adapters/cart.adapter';

//The service instance is created only once when the app starts

//Every component that injects CartService gets the same instance.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
  ) {}

  // private getHeaders() {
  //   const token = this.auth.getToken();
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   });
  // }

  getCartItems(userId: number): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map(res => res.map(item =>CartAdapter.fromApi(item)))
    );
  }

  
  
  addToCart(userId: number, productId: number): Observable<Cart> {
    console.log('Adding to cart:', { userId, productId });
    
    const payload = CartAdapter.toApi({
      userId,
        productId,
        quantity: 1,
    })

    return this.httpClient.post<Cart>(
      this.apiUrl,payload
    ).pipe(
       map(item => CartAdapter.fromApi(item))
    );
  }

  
  
  removeFromCart(cartId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${cartId}`);
  }
}
