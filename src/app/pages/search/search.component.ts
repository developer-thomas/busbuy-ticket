import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { BusLocation } from '../../models/BusLocation.interface';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelScheduler } from '../../models/TravelScheduler.interface';
import { BusInfo } from '../../models/BusInfo.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  masterSrv = inject(MasterService);
  locations$: Observable<BusLocation[]> = new Observable<BusLocation[]>();
  busList: BusInfo[] = [];
  searchObj: TravelScheduler = {
    fromLocation: 0,
    toLocation: 0,
    travelDate: '',
  };
  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterSrv.getLocations();
  }

  onSearch() {
    const { fromLocation, toLocation, travelDate } = this.searchObj;
    this.masterSrv
      .searchBus(fromLocation, toLocation, travelDate)
      .subscribe((res) => {
        this.busList = res;
        console.log(this.busList);
      });
  }
}
