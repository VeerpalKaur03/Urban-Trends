import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // adjust path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  showAuthModal = false; // modal visibility
  isLogin = true; // toggles between login and signup

  name = '';
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  // Get user name from localStorage
  get userName(): string {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        return parsed?.name || '';
      }
      return '';
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return '';
    }
  }

  // Open login/signup modal
  openAuthModal() {
    this.showAuthModal = true;
  }

  // Close modal when clicking outside
  closeModal(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('fixed')) this.showAuthModal = false;
  }

  // Toggle between login/signup
  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }

  // Handle login/signup
  onSubmit() {
    if (this.isLogin) {
      // LOGIN
      this.http
        .post('http://127.0.0.1:3000/login', {
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: (res: any) => {
            // Save user data & token
            this.authService.saveUserData(res, res.token);

            // Clear old user's data
            localStorage.removeItem('cartItems');
            localStorage.removeItem('orders');

            alert('Login successful!');
            this.showAuthModal = false;

            //  Refresh UI instantly
            window.location.reload();
          },
          error: () => alert('Login failed! Please check your credentials.'),
        });
    } else {
      // SIGNUP
      this.http
        .post('http://127.0.0.1:3000/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .subscribe({
          next: (res: any) => {
            this.authService.saveUserData(res, res.token);
            localStorage.removeItem('cartItems');
            localStorage.removeItem('orders');
            alert('Signup successful!');
            this.showAuthModal = false;

            // Refresh UI instantly
            window.location.reload();
          },
          error: () => alert('Signup failed! Try again.'),
        });
    }
  }

  // Logout
  logout() {
    this.authService.logout();
    localStorage.removeItem('cartItems');
    localStorage.removeItem('orders');
    alert('Logged out successfully!');

    window.location.reload();
  }
}
