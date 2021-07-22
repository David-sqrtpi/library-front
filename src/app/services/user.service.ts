import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const URL_API = `${environment.urlApi}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post(URL_API, user);
  }

  read(id: number) {
    return this.http.get(`${URL_API}/${id}`);
  }

  update(user: User) {
    return this.http.put(URL_API, user);
  }

  delete(id: number) {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
