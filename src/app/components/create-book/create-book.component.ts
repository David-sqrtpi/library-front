import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  bookForm = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    stock: ['', [Validators.required, Validators.min(0)]],
    rate: ['', [Validators.required, Validators.min(0)]],
    availableQuantity: [''],
  });

  constructor(private bookService: BookService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
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

    this.bookForm.get('availableQuantity')?.setValue(this.bookForm.get('stock')?.value);

    console.log(this.bookForm.value);

    this.bookService.create(this.bookForm.value).subscribe(
      () => {
        this.snackBar.open("Se ha creado el libro", "", {
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