import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent{

  constructor(private bookService: BooksService, private router: Router, private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required, Validators.minLength(2)]], // Combined validators into one array
    image: ['', [Validators.required]],
    information: ['', [Validators.required, Validators.maxLength(255)]],
    summary: ['', [Validators.required, Validators.maxLength(255)]],
    price: ['', [Validators.required]],
  })

  createBook(): void {
    if(this.form.invalid) {
      return;
    }

    const { title, author, image, information, summary, price } = this.form.value;
    this.bookService.postBook(title!, author!, image!, information!, summary!, price!).subscribe(() => {
        this.router.navigate(['/books-collection'])
    })
  }
}
