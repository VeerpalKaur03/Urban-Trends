import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Cart } from '../../models/cart.model';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;
  isPlacingOrder: boolean = false;
  userId!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.authService.getUserId();
    console.log('id in cart:', id);
    
    if (!id) {
      alert('Please login to view your cart.');
      this.router.navigate(['/']);
      return;
    }

    this.userId = id;
    console.log('userId in cart component:', this.userId);
    
    this.getCartItems();
  }



  getCartItems() {
  console.log('Fetching cart for user:', this.userId);
    
    this.cartService.getCartItems(this.userId).subscribe({
      next: (items: any[]) => {
        console.log('Fetched cart items:', items);
        this.cartItems = items || [];

        // Calculate totals
        this.totalAmount = this.cartItems.reduce(
          (sum, item) => sum + (item.product?.price || 0) * item.quantity,
          0
        );
        this.totalItems = this.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      },
      error: (err) => {
        console.error('Failed to fetch cart items', err);
        alert('Error fetching cart items.');
      },
    });
  }



  removeFromCart(cartId: number) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => this.getCartItems(),
      error: (err) => {
        console.error('Error removing item:', err);
        alert('Failed to remove item.');
      },
    });
  }



  placeOrder() {
    if (!this.cartItems.length) {
      alert('Your cart is empty!');
      return;
    }

    this.isPlacingOrder = true;

    this.orderService.placeOrder(this.userId).subscribe({
      next: () => {
        alert('Order placed successfully! 🎉');
        this.isPlacingOrder = false;
        this.cartItems = [];
        this.totalAmount = 0;
        this.totalItems = 0;
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Order placement failed:', err);
        alert('Failed to place order!');
        this.isPlacingOrder = false;
      },
    });
  }
}
