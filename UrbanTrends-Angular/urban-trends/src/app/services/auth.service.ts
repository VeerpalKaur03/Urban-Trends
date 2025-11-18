import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Get stored token
  getToken(): string | null {
    // console.log(localStorage.getItem('token'));
    
    return localStorage.getItem('token');
  }

  // Get loggedin user ID
  getUserId(): number | null {
    const user = localStorage.getItem('user');
    console.log('userId   ', user );
    
    return user ? JSON.parse(user).id : null;
  }

  // Save user data and token after login/signup
  saveUserData(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  // Logout user
  logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('orders');
}

}
