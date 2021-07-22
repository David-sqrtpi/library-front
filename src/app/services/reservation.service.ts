import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reserve } from '../interfaces/reserve';

const URL_API = `${environment.urlApi}/reserves`;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  create(reserve: Reserve) {
    return this.http.post<Reserve>(URL_API, reserve);
  }

  read(reserveId: number) {
    return this.http.get(`${URL_API}/${reserveId}`);
  }
}
