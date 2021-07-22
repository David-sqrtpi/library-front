import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: './reserve-detail.component.html',
  styleUrls: ['./reserve-detail.component.css']
})
export class ReserveDetailComponent implements OnInit {
  reserve: Reserve = {};
  reservationId: number = this.router.snapshot.params['reserveId'];

  constructor(private reservationService: ReservationService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationService.read(this.reservationId).subscribe(
      reserve => this.reserve = reserve
    );
  }

}
