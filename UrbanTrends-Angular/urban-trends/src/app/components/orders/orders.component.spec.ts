import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent , HttpClientTestingModule,
        RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('orders should be empty initially', () => {
    expect(component.orders.length).toBe(0);
  });

  it('should have userId undefined initially', () => {
    expect(component.userId).toBeUndefined();
  });

  it('should have getOrder method defined', () => {
    expect(typeof component.getOrder).toBe('function');
  });

  it('should have cancelOrder method defined', () => {
    expect(typeof component.cancelOrder).toBe('function');
  });
});
