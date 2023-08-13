import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../../books.service';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from 'src/app/interfaces/comments';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  constructor(private booksService: BooksService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {}

  bookId = this.activatedRoute.snapshot.paramMap.get('id');

  onSubmit(form: NgForm) {

    if(form.invalid) return;

    const data: Comments = {
      username: form.value.name,
      comment: form.value.comment,
      _ownerId: this.userService.loggedUser?._id as string,
      _id: uuid(),
    }

    if (
      (!data.username || data.username.trim().length === 0) &&
      (!data.comment || data.comment.trim().length === 0)
    ) {
      alert('Please enter data in the fields!');
      form.reset();
      return;
    }

    this.booksService.postComment(this.bookId!, data)
    this.router.navigate(['/books-collection/details/' + this.bookId])
  } 
}

