import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';
import { Comments } from '../interfaces/comments';
import { BehaviorSubject } from 'rxjs';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private book$$ = new BehaviorSubject<Book | undefined>(undefined);
  public book$ = this.book$$.asObservable();
  book: Book | undefined;

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(`${apiUrl}/books`)
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${apiUrl}/books/${id}`)
  }

  getComments(bookId: string) {
  return this.http.get<Comments[]>(`${apiUrl}/comments`);
  }

  postBook(title: string, author: string, image: string, information: string, summary: string, price: string) {
    return this.http.post<Book>(`${apiUrl}/books`, { title, author, image, information, summary, price });
  }

  deleteBook(id: string) {
    return this.http.delete<Book>(`${apiUrl}/books/${id}`);
  }

  editBook(bookId: string, data: Book) {
    return this.http.put<Book>(`${apiUrl}/books/${bookId}`, data )
  }
}
