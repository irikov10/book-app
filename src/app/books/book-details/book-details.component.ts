import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { BooksService } from '../books.service';
import { Comments } from 'src/app/interfaces/comments';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  commentsList: Comments[] | null = null;
  bookInformation: Book[] | null = null ;

  constructor(private bookService: BooksService, private activeRoute: ActivatedRoute) {}

  
  ngOnInit(): void {
    const bookId = this.activeRoute.snapshot.paramMap.get('id');
    
    this.bookService.getBookById(bookId!).subscribe({
      next: (value) => {
        console.log(value)
        this.bookInformation =[value]; 
        console.log(this.bookInformation)
      },
      error: error =>  { alert(error) }
    });

    this.bookService.getComments().subscribe({
      next: (value) => {
        this.commentsList = Object.values(value);
      },
      error: error =>  { throw new Error(error) }
    })
  }
}
