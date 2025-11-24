import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Cart } from '../../models/cart.model';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CartItemsComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html'
})


export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  totalAmount = 0;
  totalItems = 0;
  isPlacingOrder = false;
  userId!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const id = this.authService.getUserId();

    if (!id) {
      alert('Please login first.');
      this.router.navigate(['/']);
      return;
    }

    this.userId = id;
    this.fetchCart();
  }

  fetchCart() {
    this.cartService.getCartItems(this.userId).subscribe({
      next: (items) => {
        this.cartItems = items;

        this.totalAmount = items.reduce(
          (sum, item) => sum + item.product!.price * item.quantity, 0
        );

        this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      },
      error: () => alert('Error fetching cart.')
    });
  }

  removeItem(cartId: number) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => this.fetchCart(),
      error: () => alert('Failed to remove')
    });
  }

  placeOrder() {
    this.isPlacingOrder = true;

    this.orderService.placeOrder(this.userId).subscribe({
      next: () => {
        alert('Order placed!');
        this.router.navigate(['/orders']);
      },
      error: () => alert('Failed to place'),
    });
  }
}
