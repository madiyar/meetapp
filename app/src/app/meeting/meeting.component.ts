import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Meeting } from '../shared/types/meeting.types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeetingsService } from '../shared/services/meetings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from '../shared/types/room.types';
import { RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  form: FormGroup;
  meeting: Meeting;
  rooms: Room[];

  constructor(
    private meetingsService: MeetingsService,
    private roomsService: RoomsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.roomsService.getAll()
    .subscribe(data => {
      this.rooms = data;
    });
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          return this.meetingsService.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(meeting => {
        this.meeting = meeting;
        if (this.meeting) {
          this.form.patchValue(this.meeting);
          this.form.get('roomId').patchValue(""+this.meeting.roomId);
          if(this.meeting.freeEntry) {
            this.form.get('freeEntry').patchValue('1');
          } else {
            this.form.get('freeEntry').patchValue('0');
          }
        }  
      }
    );

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      roomId: new FormControl(null, Validators.required),
      freeEntry: new FormControl('', Validators.required),
    });
  }

  onDateSelected(result: Date): void {
    let startDate = this.getFormattedDate(result[0]);
    let endDate = this.getFormattedDate(result[0]);
    this.form.get('startDate').patchValue(startDate);
    this.form.get('endDate').patchValue(startDate);
  }

  getFormattedDate(date): string {
    return `${date.getFullYear()}-${(date.getMonth()>9) ? date.getMonth() : "0"+date.getMonth()}-${(date.getDate()>9) ? date.getDate() : "0"+date.getDate()} ${(date.getHours()>9) ? date.getHours() : "0"+date.getHours()}:${(date.getMinutes()>9) ? date.getMinutes() : "0"+date.getMinutes()}:${(date.getSeconds()>9) ? date.getSeconds() : "0"+date.getSeconds()}`;
  }

  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    if(!this.form.valid) {
      return;
    }
    this.form.get('roomId').patchValue(parseInt(this.form.get('roomId').value));

    // Update Meeting
    if(this.meeting) {
      this.meetingsService.update({...this.meeting, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['meetings']);
        }
      });
      return;
    }

    console.log(this.form.value);
  }

}
