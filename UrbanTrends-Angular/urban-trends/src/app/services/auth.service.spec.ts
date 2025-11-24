import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AuthService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken should return null when no token stored', () => {
    expect(service.getToken()).toBeNull();
  });

  it('getUserId should return correct user id', () => {
    const user = { id: 25, name: 'Test User' };
    localStorage.setItem('user', JSON.stringify(user));

    expect(service.getUserId()).toBe(25);
  });
});
