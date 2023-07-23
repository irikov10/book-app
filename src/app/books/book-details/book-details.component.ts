import { AfterViewInit, Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from 'src/app/interfaces/book';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements AfterViewInit {

  book: Book[] = [];

  constructor(private bookService: BooksService, private location: Location) {}

  getBookId(): string {
   return this.location.path().split('details/')[1];
  }

  ngAfterViewInit(): void {
    // this.bookService.getBookById(this.getBookId()).subscribe({
    //   next: (value) => {
    //     this.book = Object.values(value);
    //   },

    //   error: error => {
    //     alert(error)
    //   }
    // })
  }
}
