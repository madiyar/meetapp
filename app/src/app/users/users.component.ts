import { Component, OnInit } from '@angular/core';
import { User } from '../shared/types/user.types';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.usersService.getAll()
    .subscribe(
      data => {
        console.log(data);
        this.users = data;
      }
    );
  }

}
