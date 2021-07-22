import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { Reserve } from 'src/app/interfaces/reserve';
import { User } from 'src/app/interfaces/user';
import { ReservationService } from 'src/app/services/reservation.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  minDate: Date = new Date(Date.now() + 86400000);

  quantity = this.fb.control("", [Validators.required, Validators.min(1), Validators.max(this.data.availableQuantity!)]);
  endDate = this.fb.control("", Validators.required);

  constructor(private fb: FormBuilder,
    private reserveService: ReservationService,
    public dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private snackBar: MatSnackBar,
    private route: Router) {
  }

  ngOnInit(): void {
  }

  reserve() {
    if (this.endDate.invalid || this.quantity.hasError('required')) {
      this.snackBar.open("Completa todos los campos", "", {
        duration: 3000
      });
      throw new Error("");
    }

    if (this.quantity.hasError('min')) {
      this.snackBar.open("Ingresa una cantidad válida", "", {
        duration: 3000
      });

      throw new Error("");
    }

    let book: Book = {
      id: this.data.id
    }

    let user: User = {
      id: +sessionStorage.getItem('userId')!
    }

    const reserve = new Reserve(book, user, this.endDate.value, this.quantity.value);

    this.reserveService.create(reserve).subscribe(
      test => {
        this.snackBar.open("El libro ha sido reservado!", "", {
          duration: 3000
        });
        this.dismiss();
        this.route.navigate([`reserves/${test.id}`]);
      },
      error => {
        this.snackBar.open(error.error.message.replace(/[0-9]/g, ''), "", {
          duration: 3000
        });
      }
    );
  }

  dismiss() {
    this.dialogRef.close();
  }
}
