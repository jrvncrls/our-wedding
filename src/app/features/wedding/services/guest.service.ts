import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Guest {
  id: string;
  token: string;
  first_name: string;
  last_name: string;
  nickname: string | null;
  email: string | null;
  last_open_link_date: string | null;
  created_at: string;
}

const TOKEN_KEY = 'guest_token';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private readonly baseUrl = environment.apiBaseUrl;

  readonly guest = signal<Guest | null>(null);

  constructor(private http: HttpClient) {}

  getGuestByToken(token: string): Observable<Guest> {
    return this.http.get<Guest>(`${this.baseUrl}/guests/${token}`);
  }

  setGuest(guest: Guest): void {
    this.guest.set(guest);
    sessionStorage.setItem(TOKEN_KEY, guest.token);
  }

  getStoredToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
