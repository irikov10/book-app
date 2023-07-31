import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';
import { Comments } from '../interfaces/comments';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(apiUrl + '/books')
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${apiUrl}/books/${id}`)
  }

  getComments() {
    return this.http.get<Comments[]>(`${apiUrl}/books/comments`);
  }

  postBook(title: string, author: string, image: string, information: string, summary: string, price: string) {
    return this.http.post<Book>(`${apiUrl}/books`, { title, author, image, information, summary, price });
  }

  deleteBook(id: string) {
    return this.http.delete<Book>(`${apiUrl}/books/${id}`);
  }
}
