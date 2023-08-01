import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css']
})
export class FavoriteBooksComponent implements OnInit {
  booksCollection: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: (value) => {
        this.booksCollection = Object.values(value).slice(0, 3);
      },
      error: (error) => {
        alert(error);
      },
    });
  }
} 
