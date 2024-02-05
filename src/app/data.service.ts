import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://your-fastapi-backend-api-url';

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }
}