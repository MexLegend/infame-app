import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SafeUser, User } from '../types/user';
import { AuthError } from '../types/emailPayload';

interface RegisterResponse {
  user?: SafeUser,
  error?: AuthError,
  ok: boolean,
  total: number
}

interface ChangeUserPasswordParams {
  userId?: string;
  oldPassword: string | null;
  newPassword: string;
  confirmNewPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Observable<RegisterResponse> {
    const url = `${environment.URI}/api/user/register`;

    return this.http.post<RegisterResponse>(url, user);
  }

  deleteUser(id: string): Observable<SafeUser> {
    const url = `${environment.URI}/api/user/${id}`;

    return this.http.delete<SafeUser>(url);
  }

  updateUser(user: User, id: string): Observable<SafeUser> {

    const url = `${environment.URI}/api/user/${id}`;

    return this.http.put<SafeUser>(url, user);
  }

  updateUserPassword(params: ChangeUserPasswordParams): Observable<RegisterResponse> {

    const url = `${environment.URI}/api/user/change-password/${params.userId}`;

    return this.http.put<RegisterResponse>(url, params);
  }

}
