import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../types/user.types';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.host}/users`);
    }

    create(user: User) {
        return this.httpClient.post<User>(`${this.host}/users`, user);
    }
    
    getById(id: number) {
        return this.httpClient.get<User>(`${this.host}/users/${id}`);
    }

    update(category: User) {
        return this.httpClient.put<any>(`${this.host}/users/${category.id}`, category);
    }

}