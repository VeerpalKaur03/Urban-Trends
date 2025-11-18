import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CartComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize cartItems as empty array', () => {
    expect(component.cartItems).toEqual([]);
  });


  it('should initialize totalItems as 0', () => {
    expect(component.totalItems).toBe(0);
  });

  
  it('should initialize totalAmount as 0', () => {
    expect(component.totalAmount).toBe(0);
  });


  it('should have removeFromCart method', () => {
    expect(component.removeFromCart).toBeDefined();
  });

  
  it('should have getCartItems method', () => {
    expect(component.getCartItems).toBeDefined();
  });
});
