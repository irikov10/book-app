import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { BooksService } from '../books.service';
import { Comments } from 'src/app/interfaces/comments';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  commentsList: Comments[] | null = null;
  bookInformation: Book[] | null = null ;
  bookId: string | null = null;

  constructor(public bookService: BooksService, private activeRoute: ActivatedRoute, private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.bookId = this.activeRoute.snapshot.paramMap.get('id');
    
    this.bookService.getBookById(this.bookId!).subscribe({
      next: (value) => {
        this.bookInformation =[value]; 
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

  onDeleteBook(bookId: string) {

    if(!this.bookId) {
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
}
