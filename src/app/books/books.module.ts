import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSectionComponent } from './book-details/comment-section/comment-section.component';
import { AddCommentComponent } from './book-details/add-comment/add-comment.component';
import { EditCommentComponent } from './book-details/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    BookCollectionComponent,
    FavoriteBooksComponent,
    BookDetailsComponent,
    EditBookComponent,
    AddBookComponent,
    CommentSectionComponent,
    AddCommentComponent,
    EditCommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BookCollectionComponent,
    FavoriteBooksComponent,
    BookDetailsComponent,
    EditBookComponent,
    AddCommentComponent,
  ],
})
export class BooksModule { }
