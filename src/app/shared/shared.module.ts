import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesPipe } from './pipes.pipe';
import { BookPipePipe } from './pipes/book-pipe.pipe';



@NgModule({
  declarations: [
    PipesPipe,
    BookPipePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
