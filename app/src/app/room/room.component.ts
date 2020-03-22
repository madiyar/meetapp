import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from '../shared/types/room.types';
import { RoomsService } from '../shared/services/rooms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UploadFile } from 'ng-zorro-antd';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/types/category.types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  form: FormGroup;
  room: Room;
  categories: Category[] = [];
  env = environment;
  title: string = "New Room";
  loading: boolean;
  loadingLocation: boolean;
  isLoading: boolean;

  constructor(
    private roomsService: RoomsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          this.title = "Edit Room";
          return this.roomsService.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(room => {
        this.room = room;
        console.log(room);
        if (this.room) {
          this.form.patchValue(this.room);
          this.form.get('categoryId').patchValue(""+this.room.categoryId);
        }  
      }
    );

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      photo: new FormControl(''),
      location: new FormControl(''),
      categoryId: new FormControl(null, Validators.required),
    });
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

    this.form.get('categoryId').patchValue(parseInt(this.form.get('categoryId').value));

    // Update User
    this.isLoading = true;
    if(this.room) {
      this.roomsService.update({...this.room, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['rooms']);
        }
        this.isLoading = false;
      });
      return;
    }

    // console.log(this.form.value);

    // Create User
    this.roomsService.create(this.form.value)
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res && res.id) {
          this.router.navigate(['rooms']);
          this.isLoading = false;
        }
      });
  }

  handleChange(info: { file: UploadFile }, type = 'image'): void {
    switch (info.file.status) {
      case 'uploading':
        if(type === 'location') {
          this.loadingLocation = true;
        } else {
          this.loading = true;
        }
        break;
      case 'done':
        // Get this url from response in real world.
        console.log(info.file);
        if(type === 'location') {
          this.form.get('location').setValue(info.file.response.filename)
        } else {
          this.form.get('photo').setValue(info.file.response.filename)
        }
        break;
      case 'error':
        if(type === 'location') {
          this.loadingLocation = false;
        } else {
          this.loading = false;
        }
        break;
    }
  }

}
