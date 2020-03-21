import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../shared/services/rooms.service';
import { Room } from '../shared/types/room.types';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(
    private roomsService: RoomsService
  ) { }

  public rooms: Room[] = [];
  env = environment;

  ngOnInit(): void {
    this.roomsService.getAll()
    .subscribe(data => {
      this.rooms = data;
    });
  }

}
