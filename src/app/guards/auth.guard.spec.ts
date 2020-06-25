import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { asyncData } from 'src/test';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let guard: AuthGuard;
  const router = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        AuthService,
        Router
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard.canActivate()).toBeTruthy(false);
  });
});
