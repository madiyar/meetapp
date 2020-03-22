import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { RoomComponent } from './room/room.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'meeting/:id', component: MeetingComponent },
      { path: 'meetings', component: MeetingsComponent },
      { path: 'room/new', component: RoomComponent },
      { path: 'room/:id', component: RoomComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'category/new', component: CategoryComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'user/new', component: UserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'users', component: UsersComponent },
      { path: '::', component: PageNotFoundComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }