import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Comments } from 'src/app/interfaces/comments';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  loggedInUserId: string | null = null;

  commentsList: Comments[] | null = null;
  comments: [] = [];
  bookInformation: Book[] | null = null;
  bookId: string | null = null;
  bookOwnerId: string | null = null;
  book: Book | null = null;

  constructor(public bookService: BooksService, private activeRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  // loggedUser = this.userService.loggedUser?._id;

  ngOnInit(): void {
    this.loggedInUserId = this.userService.getLoggedInUserId();

    this.bookId = this.activeRoute.snapshot.paramMap.get('id');

    this.bookService.getBookById(this.bookId!).subscribe({
        next: (value) => {
          console.log(value);
          this.book = value;
          this.bookOwnerId = value._ownerId;
        },
        
        error: (error) => {
          alert(error.message);
        }
    })

    this.bookService.getBookById(this.bookId!).subscribe({

      next: (value) => {
        this.bookInformation = [value];
      },
      error: error => { alert(error) }
    });
  }

  onDeleteBook(bookId: string) {

    if (!this.bookId) {
      return;
    }

    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.router.navigate(['/books-collection'])
      },
      error: (error) => {
        alert('Cannot delete the book because' + error)
      }
    })
  }

  
  addToFavorites() {
    this.bookService.addToFavorites(this.book!);
    this.router.navigate(['/favorite-books'])
  }

  isAuthorized(): boolean {
    console.log(this.loggedInUserId)
    console.log(this.bookOwnerId)
    return this.loggedInUserId !== null && this.loggedInUserId === this.bookOwnerId;
  }
}
