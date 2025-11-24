import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial products array should be empty', () => {
    expect(component.products.length).toBe(0);
  });

  it('slides array should have items', () => {
    expect(component.slides.length).toBeGreaterThan(0);
  });

  it('currentSlide should start at 0', () => {
    expect(component.currentSlide).toBe(0);
  });

  it('filterByCategory method should be defined', () => {
    expect(typeof component.filterByCategory).toBe('function');
  });

  it('addToCart method should be defined', () => {
    expect(typeof component.addToCart).toBe('function');
  });

  it('scrollToProducts should be defined', () => {
    expect(typeof component.scrollToProducts).toBe('function');
  });
});
