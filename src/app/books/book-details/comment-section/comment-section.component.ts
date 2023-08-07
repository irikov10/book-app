import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { Comments } from 'src/app/interfaces/comments';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  commentsList!: Comments[];
  bookId: string | null = null;

  constructor(private booksService: BooksService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.booksService.getComments(this.bookId!).subscribe({
      next: (commentData) => {
        this.commentsList = Object.values(commentData);
      },

      error: (error) => {
        alert(error.message)
      }
    })
  }
}
