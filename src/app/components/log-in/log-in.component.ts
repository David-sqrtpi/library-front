import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/services/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  waiting: boolean = false;

  constructor(private fb: FormBuilder,
    private loginService: LogInService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  logIn() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.hasError('email')) {
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

    this.loginService.login(this.loginForm.value).subscribe(
      user => {
        sessionStorage.setItem("userId", user.id.toString());
        sessionStorage.setItem("tipoUsuario", user.tipoUsuario!.toString())
        this.waiting = false;
        location.reload();
        this.router.navigateByUrl("books");
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
