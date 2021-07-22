import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  clientForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  waiting: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    if (this.clientForm.invalid) {
      if (this.clientForm.get('email')?.hasError('email')) {
        this.snackBar.open("Correo electrónico inválido", "", {
          duration: 3000
        });
        throw new Error("");
      }

      this.snackBar.open("Completa todos los campos", "", {
        duration: 3000
      });

      throw new Error("");
    }

    this.waiting = true;

    let user: User = this.clientForm.value;
    user.tipoUsuario = "CLIENTE";

    this.userService.create(user).subscribe(
      () => {
        this.waiting = false;
        this.snackBar.open("Se ha registrado el usuario", "", {
          duration: 3000
        });
        this.router.navigateByUrl('log-in');
      },
      error => {
        this.waiting = false;
        this.snackBar.open(error.error.message.replace(/[0-9]/g, ''), "", {
          duration: 3000
        });
      }
    );
  }

}
