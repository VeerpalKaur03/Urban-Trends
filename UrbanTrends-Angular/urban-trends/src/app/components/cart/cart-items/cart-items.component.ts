import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cart-items.component.html'
})
export class CartItemsComponent {
  @Input() cartItems: any[] = [];
  @Output() remove = new EventEmitter<number>();
}
