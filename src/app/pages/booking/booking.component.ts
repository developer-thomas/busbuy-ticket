import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ActivatedRoute } from '@angular/router';
import { BusDetails } from '../../models/BusDetails.interface';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingComponent implements OnInit {
  private masterService = inject(MasterService);
  activatedRoute = inject(ActivatedRoute);
  // id do viagem/onibus selecionado no search que é mandado como parâmetro de rota
  scheduleId: number = 0;
  // informações da viagem selecionada
  scheduleData!: BusDetails;
  // Número de lugares total do ônibus
  seatArray: number[] = [];
  // Lugares reservados do ônibus
  bookedSeatsArray: number[] = [];
  // Lugares selecionados pelo usuário
  userSelectedSeatArray: number[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
    });
    this.getScheduleDetailsById();
    this.getBookedSeats();
  }

  getScheduleDetailsById() {
    this.masterService
      .getSchedulerById(this.scheduleId)
      .subscribe((res: BusDetails) => {
        this.scheduleData = res;
        for (let i = 0; i <= this.scheduleData.totalSeats; i++) {
          this.seatArray.push(i);
        }
      });
  }

  getBookedSeats() {
    this.masterService.getBookedSeats(this.scheduleId).subscribe((res) => {
      this.bookedSeatsArray = res;
    });
  }

  checkIfSeatIsBooked(seatNumber: number) {
    return this.bookedSeatsArray.indexOf(seatNumber);
  }

  selectSeat(seatNumber: number) {
    if (this.userSelectedSeatArray.includes(seatNumber)) {
      let index = this.userSelectedSeatArray.indexOf(seatNumber);
      this.userSelectedSeatArray.splice(index, 1);
    } else {
      this.userSelectedSeatArray.push(seatNumber);
    }
  }

  checkIsSeatSelected(seatNumber: number) {
    return this.userSelectedSeatArray.indexOf(seatNumber);
  }
}
