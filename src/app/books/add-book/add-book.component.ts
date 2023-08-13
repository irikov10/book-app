import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { UserService } from 'src/app/user/user.service';
import {v4 as uuid } from 'uuid'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent{

  constructor(private bookService: BooksService, private router: Router, private userService: UserService) {}

  createBook(form: NgForm): void {
    if(form.invalid) {
      return;
    }
    

    const data: Book = {
      username: form.value.username,
      title: form.value.title,
      author: form.value.author,
      image: form.value.image,
      information: form.value.information,
      summary: form.value.summary,
      price: form.value.price,
      _ownerId: this.userService.loggedUser?._id as string,
      _id: uuid()
    }

    // const { username, title, author, image, information, summary, price } = this.form.value;
    this.bookService.postBook(data)
    this.router.navigate(['/books-collection'])
  }
}
