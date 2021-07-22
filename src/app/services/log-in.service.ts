import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

const URL_API = `${environment.urlApi}/login`;

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  login(intent: any) {
    return this.http.post<User>(URL_API, intent);
  }
}
