import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { Comments } from 'src/app/interfaces/comments';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  commentsList!: Comments[];
  bookId = this.activatedRoute.snapshot.paramMap.get('id');
  comment: string = '';

  constructor(private booksService: BooksService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getComments(this.bookId!).subscribe({
      next: (commentData) => {

        if(commentData !== null) {
          this.commentsList = Object.values(commentData);
          console.log(this.commentsList)
        } else {
          this.commentsList = [];
          return
        }
      },

      error: (error) => {
        alert(error.message)
      }
    })
  }

  onRedirect() {
    this.router.navigate(['/add-comment', this.bookId]);
  }

  deleteComment(id: string) {
    if(id) {
      this.booksService.deleteCommentById(id, this.bookId!).subscribe({
        next: () => {
          this.commentsList = this.commentsList?.filter((comment) => comment._id !== id);
        },

        error: (error) => {
          throw new Error(`Cant delete the book because ${error.message}`);
        }
      })
    } else {
      alert('The comment does not have an id');
      return
    }
  }

  editComment(id: string) {
    if(id) {
      this.router.navigate(['/books-collection/details/edit-comment/' + this.bookId + '/' + id ]);
    } else {
      alert('Cant redirect to edit page');
      return
    }
  }
}