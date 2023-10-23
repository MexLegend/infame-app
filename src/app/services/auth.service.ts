import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { getStorage, removeStorage, setStorage } from '../helpers/storage';
import { SafeUser, User } from '../types/user';
import { AuthError } from '../types/emailPayload';


export interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface LoginResponse {
  user?: SafeUser,
  tokens?: Tokens,
  error?: AuthError,
  ok: boolean
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private user: SafeUser | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  favoritedProducts: WritableSignal<string[]> = signal(this.getCurrentUser()?.favoriteProducts?.productIds || []);
  userEmitter: EventEmitter<SafeUser | null> = new EventEmitter();

  setCurrentUserAndTokens(user: SafeUser | null, tokens: Tokens | null) {
    if (user && tokens)
      setStorage([
        { key: 'user', value: user },
        { key: 'access_token', value: tokens?.access_token! },
        { key: 'refresh_token', value: tokens?.refresh_token! },
      ]);

    this.user = user;
    this.accessToken = tokens?.access_token || null;
    this.refreshToken = tokens?.refresh_token || null;
    this.favoritedProducts.set(user?.favoriteProducts.productIds || []);
    this.userEmitter.emit(user);
  }

  setCurrentUserData(user: SafeUser | null) {
    if (user)
      setStorage([{ key: 'user', value: user }]);

    this.user = user;
    this.userEmitter.emit(user);
  }

  loadStorageUser() {
    const [user, access_token, refresh_token] = getStorage([
      'user',
      'access_token',
      'refresh_token',
    ]);

    if (user && access_token && refresh_token)
      this.setCurrentUserAndTokens(user, { access_token, refresh_token });
  }

  getCurrentUser(): SafeUser | null {
    return this.user;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${environment.URI}/api/auth/login`;

    return this.http.post<LoginResponse>(url, { email, password }).pipe(
      map((resp) => {

        if (resp.ok) {
          this.setCurrentUserAndTokens(resp.user!, {
            access_token: resp.tokens!.access_token,
            refresh_token: resp.tokens!.refresh_token
          });
        }

        return resp;
      })
    );
  }

  logout() {
    removeStorage(['user', 'access_token', 'refresh_token']);
    this.setCurrentUserAndTokens(null, null);
    location.reload();
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
