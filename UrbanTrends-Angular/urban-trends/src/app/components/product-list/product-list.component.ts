import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ViewChild, ElementRef } from '@angular/core';
import { ProductCardFactory } from '../../factories/product-card.factory';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgClass],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild('productsSection') productsSection!: ElementRef<HTMLElement>;

  scrollToProducts() {
    if (this.productsSection) {
      this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string = '';
  userId!: number;


  // Slideshow 
  slides = [
    {
      image: '/assets/posters/winter.jpg',
      title: 'New Winter Collection',
      subtitle: 'Cozy styles for the chilly season',
    },
    {
      image: '/assets/posters/newArrival.jpg',
      title: 'Trendy Arrivals',
      subtitle: 'Stay fashionable every day',
    },
    {
      image: '/assets/posters/off.jpg',
      title: 'Exclusive Offers',
      subtitle: 'Up to 50% off — limited time only!',
    },
  ];
  currentSlide = 0;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.getProducts();
    this.route.params.subscribe(params => {
      this.currentCategory = params['category'] || '';
      this.filterByCategory();
    });

    // Auto slide every 4 seconds
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.filterByCategory();
    });
  }


  addToCart(productId: number): void {
    const id = this.authService.getUserId();
    if (!id) {
      alert('Please login to add items to your cart.');
      return;
    }

    this.userId = id;
    console.log('Adding product to cart:', productId, 'for user:', this.userId);
    
    this.cartService.addToCart(this.userId, productId).subscribe({
      next: () => alert('Added to cart!'),
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Error adding to cart');
      },
    });
  }

  filterByCategory(): void {
    this.filteredProducts = !this.currentCategory
      ? this.products
      : this.products.filter(
          p => p.category.toLowerCase() === this.currentCategory.toLowerCase()
        );
  }

  getCardConfig(product: Product) {
  return ProductCardFactory.createCard(product);
}
}
