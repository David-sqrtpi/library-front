import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['name', 'author', 'category', 'availableQuantity', 'reservedQuantity'];
  waiting: boolean = true;
  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.bookService.list().subscribe(
      books => {
        this.books = books;
        this.waiting = false;
      },
      () => this.waiting = false
    );
  }

  onClick(row: Book) {
    this.router.navigateByUrl(`books/${row.id}`);
  }
}
