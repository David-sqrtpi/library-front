import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReserveDetailComponent } from './components/reserve-detail/reserve-detail.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ClientGuard } from './guards/client.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'log-in', component: LogInComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'books', component: BookListComponent, canActivate: [ClientGuard] },
  { path: 'books/:id', component: BookDetailComponent, canActivate: [ClientGuard] },
  { path: 'books/:id/edit', component: BookEditComponent, canActivate: [AdminGuard] },
  { path: 'books/:id/reserve', component: ReservationComponent, canActivate: [ClientGuard] },
  { path: 'reserves/:reserveId', component: ReserveDetailComponent, canActivate: [ClientGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard] },
  { path: 'administration/create-book', component: CreateBookComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
