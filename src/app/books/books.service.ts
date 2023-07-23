import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksData: Book[] = [];

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(apiUrl + '/books')
  }
}
