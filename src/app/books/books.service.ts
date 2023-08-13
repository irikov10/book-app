import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';
import { Comments } from '../interfaces/comments';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { v4 as uuid } from 'uuid'

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  subscription: Subscription | undefined;
  private _book$ = new BehaviorSubject<Book[]>([])
  private _comment$ = new BehaviorSubject<Comments[]>([])
  book: Book | undefined;
  private favoriteBooks: Book[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiUrl}/books`)
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${apiUrl}/books/${id}`)
  }

  postBook(data: Book) {
    const bookPayload = {
      ...data,
      _ownerId: this.userService.loggedUser?._id,
      id: uuid(),
    }

    this.subscription = this.http.post<Book>(`${apiUrl}/books`, bookPayload).subscribe((book) => {
      this._book$.next([...this._book$.getValue(), book])
    })
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

    const commentPayload = {
      ...comment,
      _ownerId: this.userService.loggedUser?._id,
      id: uuid(),
    }

    this.subscription = this.http.post<Comments>(`${apiUrl}/comments/${bookId}`, commentPayload).subscribe((comment) => {
      this._comment$.next([...this._comment$.getValue(), comment])
    })

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
