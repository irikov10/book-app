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
}
