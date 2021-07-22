import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: number = this.router.snapshot.params['id'];

  book: Book = {
    id: this.id
  };

  waiting: boolean = true;

  constructor(private bookService: BookService,
    private router: ActivatedRoute,
    private navigator: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBook();
  }

  reserve() {
    const dialogRef = this.dialog.open(ReservationComponent, {
      width: '50%',
      data: this.book
    });

    dialogRef.afterClosed().subscribe(
      () => this.getBook()
    )
  }

  getBook() {
    this.bookService.read(this.id).subscribe(
      book => {
        this.waiting = false;
        this.book = book
      },
      () => this.waiting = false
    );
  }

}
