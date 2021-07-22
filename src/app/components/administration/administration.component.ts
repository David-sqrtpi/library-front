import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

export class AdministrationComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['name', 'author', 'category', 'availableQuantity', 'reservedQuantity', 'edit', 'delete'];
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

  edit() {

  }

  delete(bookId: number) {
    this.bookService.delete(bookId).subscribe(
      () => {
        location.reload();
      }
    );
  }

}
