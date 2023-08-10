import { Component, OnDestroy, OnInit } from '@angular/core';
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
  // bookForm!: FormGroup;
  book!: Book;
  bookId: string | null = null;

  constructor(private bookService: BooksService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    image: ['', [Validators.required]],
    information: ['', [Validators.required, Validators.maxLength(255)]],
    summary: ['', [Validators.required, Validators.maxLength(255)]],
    price: ['', [Validators.required]],
  });



  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.bookService.getBookById(this.bookId!).subscribe((result) => {
      console.warn(result)
      this.book = result;

      this.form = this.formBuilder.group({
        title: [result['title'], [Validators.required]],
        author: [result['author'], [Validators.required, Validators.minLength(2)]],
        image: [result['image'], [Validators.required]],
        information: [result['information'], [Validators.required, Validators.maxLength(255)]],
        summary: [result['summary'], [Validators.required, Validators.maxLength(255)]],
        price: [result['price'], [Validators.required]],
      });
    });
    ;
  }

  onEdit(): void {

    if (this.form.invalid) {
      return;
    }
  
    const editedBook: Book = {
      title: this.form.value.title!, 
      author: this.form.value.author!, 
      image: this.form.value.image!, 
      information: this.form.value.information!, 
      summary: this.form.value.summary!, 
      price: this.form.value.price!,
      _ownerId: this.book._ownerId,
      userId: this.book.userId
    };
  
    const bookId = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (!bookId) {
      return;
    }
  
    this.bookService.editBook(bookId, editedBook).subscribe(() => {
      this.router.navigate([`books-collection/details/${bookId}`]);
    });
  }
}
