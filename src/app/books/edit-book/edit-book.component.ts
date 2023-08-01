import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  book!: Book;
  bookId: string | null = null;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}
  

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
    this.bookService.getBookById(this.bookId!).subscribe((book) => {
      this.book = book;
    })

    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]], // Combined validators into one array
      image: ['', [Validators.required]],
      information: ['', [Validators.required, Validators.maxLength(255)]],
      summary: ['', [Validators.required, Validators.maxLength(255)]],
      price: ['', [Validators.required]],
    })
  }
  onEdit(): void {
    const updatedTitle = this.bookForm.value.title;
    const updatedAuthor = this.bookForm.value.author;
    const updatedImage = this.bookForm.value.image;
    const updatedInformation = this.bookForm.value.information;
    const updatedSummary = this.bookForm.value.summary;
    const updatedPrice = this.bookForm.value.price;

    this.book.title = updatedTitle;
    this.book.author = updatedAuthor;
    this.book.image = updatedImage;
    this.book.information = updatedInformation;
    this.book.summary = updatedSummary;
    this.book.price = updatedPrice;

    this.bookService.editBook(this.book.title, this.book.author, this.book.image, this.book.information, this.book.summary, this.book.price).subscribe(() => {
      this.router.navigate([`/books-collection/details/${this.bookId}`])
    })
  }
}
