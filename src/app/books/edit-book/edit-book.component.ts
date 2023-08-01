import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string | null = null;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  bookDetails: Book = {
    title: '',
    author: '',
    image: '',
    information: '',
    summary: '',
    price: '',
  }

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required, Validators.minLength(2)]], // Combined validators into one array
    image: ['', [Validators.required]],
    information: ['', [Validators.required, Validators.maxLength(255)]],
    summary: ['', [Validators.required, Validators.maxLength(255)]],
    price: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.bookId) {
      return;
    }

    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.bookDetails = book;
      this.form.patchValue(book);
    });
  }

  onEdit(): void {
    if (!this.bookId) {
      return;
    }

    console.log(this.bookDetails)
    // this.bookService.editBook(this.bookId, editedBook).subscribe(() => {
    //   this.router.navigate([`/books-collection/details/${this.bookId}`]);
    // });
  }
}
