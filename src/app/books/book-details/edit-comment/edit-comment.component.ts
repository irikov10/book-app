import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit{

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    
  }
}
