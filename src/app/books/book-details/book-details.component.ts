import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Comments } from 'src/app/interfaces/comments';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  commentsList: Comments[] | null = null;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.getComments().subscribe({
      next: (value) => {
        console.log(value)
        this.commentsList = Object.values(value);
      },
      error: error =>  { throw new Error(error) }
    })
  }
}
