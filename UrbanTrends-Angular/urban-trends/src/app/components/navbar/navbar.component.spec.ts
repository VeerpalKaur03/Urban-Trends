import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have login modal hidden by default', () => {
    expect(component.showAuthModal).toBeFalse();
  });



  it('should toggle login/signup mode', () => {
    const initialState = component.isLogin;
    component.toggleAuthMode();
    expect(component.isLogin).toBe(!initialState);
  });

  it('should have default email and password empty', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  
  it('should return empty username when localStorage has no user', () => {
    localStorage.removeItem('user');
    expect(component.userName).toBe('');
  });
});
