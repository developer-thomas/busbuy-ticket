import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusLocation } from '../models/BusLocation.interface';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // cors ta configurado para a porta 4209
  apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) {}

  getLocations(): Observable<BusLocation[]> {
    return this.http.get<BusLocation[]>(`${this.apiUrl}/GetBusLocations`);
  }

  searchBus(from: number, to: number, travelDate: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`
    );
  }
}
