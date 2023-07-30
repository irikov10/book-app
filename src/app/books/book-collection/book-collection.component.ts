import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import { Book } from 'src/app/interfaces/book';
import { BooksService } from '../books.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {
  booksList: Book[] | null = null;

  constructor(private bookService: BooksService, public userService: UserService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (value) => {
        this.booksList = Object.values(value);
      },
      error: error => { throw new Error(error) }
    })
  }
}
