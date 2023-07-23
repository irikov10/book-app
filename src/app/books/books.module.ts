import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';



@NgModule({
  declarations: [
    BookCollectionComponent,
    FavoriteBooksComponent,
    BookDetailsComponent,
    EditBookComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BookCollectionComponent,
    FavoriteBooksComponent,
    BookDetailsComponent,
    EditBookComponent
  ]
})
export class BooksModule { }
