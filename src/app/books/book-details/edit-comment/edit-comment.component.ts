import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Comments } from 'src/app/interfaces/comments';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit{

  constructor(private booksService: BooksService, private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {}

  bookId = this.activatedRoute.snapshot.paramMap.get('bookId') as string;
  commentId = this.activatedRoute.snapshot.paramMap.get('commentId') as string;
  comment!: Comments;

  editForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    comment: ['', [Validators.required, Validators.maxLength(255)]]
  })

  ngOnInit(): void {
    console.log(this.commentId)
      this.booksService.getCommentById(this.bookId, this.commentId).subscribe((response) => {
        this.comment = response;

        this.editForm = this.formBuilder.group({
          username: [response.username, [Validators.required, Validators.minLength(3)]],
          comment: [response.comment, [Validators.required, Validators.maxLength(255)]]
        });
      })
  }

  onEdit() {
    if(this.editForm.invalid) {
      return;
    }

    if(!this.bookId) {
      return
    }

    const editedForm: Comments = {
      username: this.editForm.value.username!,
      comment: this.editForm.value.comment!,
      _ownerId: this.comment._ownerId!,
      _id: this.comment._id!,
    }

    if (
      (!editedForm.username || editedForm.username.trim().length === 0) &&
      (!editedForm.comment || editedForm.comment.trim().length === 0)
    ) {
      alert('Please fill the fields with the appropriate data!');
      this.editForm.reset();
      return;
    }

    this.booksService.editComment(this.bookId, this.commentId, editedForm).subscribe(() => {
      this.router.navigate([`/books-collection/details/${this.bookId}`])
    })
  }
}
