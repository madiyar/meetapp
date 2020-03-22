import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../shared/services/meetings.service';
import { Meeting } from '../shared/types/meeting.types';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  constructor(private meetingsService: MeetingsService) { }

  meetings: Meeting[] = [];

  ngOnInit(): void {
    this.meetingsService.getAll()
    .subscribe(data => {
      this.meetings = data;
    });
  }

}
