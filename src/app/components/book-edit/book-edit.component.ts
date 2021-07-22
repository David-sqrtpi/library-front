import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent implements OnInit {
  bookForm = this.fb.group({
    name: [],
    author: [],
    category: [],
    stock: [],
    rate: []
  });

  bookId = this.route.snapshot.params['id'];

  constructor(private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.bookService.read(this.bookId).subscribe(
      book => {
        this.bookForm = this.fb.group({
          id: [book.id],
          name: [book.name, Validators.required],
          author: [book.author, Validators.required],
          category: [book.category, Validators.required],
          stock: [book.stock, [Validators.required, Validators.min(0)]],
          rate: [book.rate, [Validators.required, Validators.min(0)]],
          availableQuantity: [book.availableQuantity],
          reservedQuantity: [book.reservedQuantity]
        });
      }
    );
  }

  update() {
    if (this.bookForm.get('stock')!.hasError('min') || this.bookForm.get('rate')!.hasError('min')) {
      this.snackBar.open("Ingresa una cantidad válida", "", {
        duration: 3000
      });

      throw new Error("");
    }

    if (this.bookForm.invalid) {
      this.snackBar.open("Completa todos los campos", "", {
        duration: 3000
      });

      throw new Error("");
    }

    console.log(this.bookForm.value);
    this.bookService.update(this.bookForm.value).subscribe(
      () => {
        this.snackBar.open("Se ha editado el libro", "", {
          duration: 3000
        });
        this.goBack();
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('administration');
  }

}

//Add reservation rate in front
//Use reservation CRUD to display reservation information
//Session backend Permissions in back