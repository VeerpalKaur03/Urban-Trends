import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {
  
  @Input() totalAmount = 0;
  @Input() totalItems = 0;
  @Input() isPlacingOrder = false;
  @Input() cartLength = 0;

  @Output() placeOrder = new EventEmitter();
}
