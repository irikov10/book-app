import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookCollectionComponent } from './books/book-collection/book-collection.component';
import { FavoriteBooksComponent } from './books/favorite-books/favorite-books.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { authGuard } from './shared/Auth Guard/authGuard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'books-collection', component: BookCollectionComponent },
  { path: 'favorite-books', component:  FavoriteBooksComponent, canActivate: [authGuard] },
  { path: 'books-collection/details/:id', component: BookDetailsComponent, canActivate: [authGuard] },
  { path: 'edit-book', component: EditBookComponent, canActivate: [authGuard] },
  { path: 'add-book', component: AddBookComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
