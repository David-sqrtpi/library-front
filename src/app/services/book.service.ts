import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const URL_API = `${environment.urlApi}/books`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  create(book: Book) {
    return this.http.post(URL_API, book);
  }

  read(id: number) {
    return this.http.get<Book>(`${URL_API}/${id}`);
  }

  list() {
    return this.http.get<Book[]>(URL_API);
  }

  update(book: Book) {
    return this.http.put(URL_API, book);
  }

  delete(id: number) {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
