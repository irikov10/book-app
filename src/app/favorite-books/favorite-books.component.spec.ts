import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBooksComponent } from './favorite-books.component';

describe('FavoriteBooksComponent', () => {
  let component: FavoriteBooksComponent;
  let fixture: ComponentFixture<FavoriteBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteBooksComponent]
    });
    fixture = TestBed.createComponent(FavoriteBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
