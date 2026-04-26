import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Rsvp {
  id: string;
  guest_id: string;
  attending: boolean;
  dietary_requirements: string | null;
  stay_the_night: boolean;
  created_at: string;
  updated_at: string;
}

export interface SaveRsvpRequest {
  attending: boolean;
  dietary_requirements: string;
  stay_the_night: boolean;
}

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private readonly baseUrl = environment.apiBaseUrl;

  readonly rsvp = signal<Rsvp | null>(null);

  constructor(private http: HttpClient) {}

  getRsvpByToken(token: string): Observable<Rsvp> {
    return this.http.get<Rsvp>(`${this.baseUrl}/rsvp`, { params: { token } });
  }

  saveRsvp(token: string, body: SaveRsvpRequest): Observable<Rsvp> {
    return this.http.post<Rsvp>(`${this.baseUrl}/rsvp`, body, { params: { token } });
  }

  setRsvp(rsvp: Rsvp): void {
    this.rsvp.set(rsvp);
  }
}
