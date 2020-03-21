import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
// My imports
import { User } from '../shared/types/user.types';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  user: User;
  title: string = "New User";
  passwordVisible = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          this.title = "Edit User";
          return this.usersService.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(user => {
        this.user = user;
        if (this.user) {
          this.form.patchValue(this.user);
          if(this.user.isAdmin) {
            this.form.get('isAdmin').patchValue('1');
          } else {
            this.form.get('isAdmin').patchValue('0');
          }
        }  
      }
    );

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      isAdmin: new FormControl('0', Validators.required),
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

    // Update User
    if(this.user) {
      this.usersService.update({...this.user, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['users']);
        }
      });
      return;
    }

    console.log(this.form.value);

    // Create User
    this.usersService.create(this.form.value)
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res && res.id) {
          this.router.navigate(['users']);
        }
      });
  }
}
