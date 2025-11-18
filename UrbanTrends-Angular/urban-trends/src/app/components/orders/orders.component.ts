import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  imports: [NgFor, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Order[] =[]
  userId!:number;
   
  constructor(private orderService: OrderService, private authService: AuthService){}

  ngOnInit(){
     const id = this.authService.getUserId();
     console.log('id in orders:', id);

    if (!id) {
      alert('Please login to view your orders.');
      return;
    }

    this.userId = id;
    this.getOrder();

  }


   getOrder(){
     {
    this.orderService.getOrder(this.userId).subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => console.error(err)
    });
  }
   }


   cancelOrder(orderId: number) {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.orderService.cancelOrder(orderId).subscribe({
      next: (res) => {
        alert('Order cancelled successfully.');
        this.getOrder(); // Refresh list
      },
      error: (err) => {
        console.error(err);
        alert('Failed to cancel order.');
      }
    });
   }
  
  }
