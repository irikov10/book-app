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
  bookInformation: Book[] | null = null;
  bookId: string | null = null;
  bookOwnerId: string | null = null;

  bookDetails: Book = {
    title: '',
    author: '',
    image: '',
    information: '',
    summary: '',
    price: '',
    userId: '',
  }

  constructor(public bookService: BooksService, private activeRoute: ActivatedRoute, private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required, Validators.minLength(2)]], // Combined validators into one array
    image: ['', [Validators.required]],
    information: ['', [Validators.required, Validators.maxLength(255)]],
    summary: ['', [Validators.required, Validators.maxLength(255)]],
    price: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.loggedInUserId = this.userService.getLoggedInUserId();

    this.bookId = this.activeRoute.snapshot.paramMap.get('id');

    this.bookService.getBookById(this.bookId!).subscribe((book) => {
      this.bookDetails = {
        title: book.title,
        author: book.author,
        image: book.image,
        information: book.information,
        summary: book.summary,
        price: book.price,
        userId: book.userId,
      }


      this.bookOwnerId = book.userId;
    })

    this.bookService.getBookById(this.bookId!).subscribe({

      next: (value) => {
        this.bookInformation = [value];
      },
      error: error => { alert(error) }
    });

    this.bookService.getComments(this.bookId!).subscribe({
      next: (value) => {
        console.log(value);

        if(value !== null) {
          this.commentsList = Object.values(value);
          console.log(this.commentsList)
        } else {
          this.commentsList = [];
        }

      },
      error: error => { throw new Error(error) }
    })

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

  isAuthorized(): boolean {
    return this.loggedInUserId !== null && this.loggedInUserId === this.bookOwnerId;
  }
}
