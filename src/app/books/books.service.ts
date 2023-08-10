import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';
import { Comments } from '../interfaces/comments';
import { BehaviorSubject, Observable } from 'rxjs';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private book$$ = new BehaviorSubject<Book | undefined>(undefined);
  public book$ = this.book$$.asObservable();
  book: Book | undefined;
  private favoriteBooks: Book[] = [];

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(`${apiUrl}/books`)
  }

  getBookById(id: string) {
    return this.http.get<Book>(`${apiUrl}/books/${id}`)
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

  
  getComments(bookId: string) {
    return this.http.get<Comments[]>(`${apiUrl}/comments/${bookId}`);
  }

  postComment(bookId: string, comment: Comments) {
    return this.http.post<Comments>(`${apiUrl}/comments/${bookId}`, comment)
  }

  deleteCommentById(id: string, bookId: string) {
    return this.http.delete<Comments>(`${apiUrl}/comments/${bookId}/${id}`)
  }

  getCommentById(bookId: string, commentId: string): Observable<Comments> {
    return this.http.get<Comments>(
      `${apiUrl}/comments/${bookId}/${commentId}`
    );
  }

  editComment(bookId: string, commentId: string, data: Comments) {
    return this.http.put<Comments>(`${apiUrl}/comments/${bookId}/${commentId}`, data);
  } 

  addToFavorites(book: Book) {
    this.favoriteBooks.push(book);
  }

  getFavoriteBooks() {
    return this.favoriteBooks;
  }
}
