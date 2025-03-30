import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private apiUrl = '/api/v1/currentTravels';

  constructor(private http: HttpClient) { }

  getTravels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
