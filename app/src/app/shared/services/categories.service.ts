import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '../types/category.types';
import { environment } from '../../../environments/environment';
import { Room } from '../types/room.types';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.host}/categories`);
    }

    getById(id: number) {
        return this.httpClient.get<Category>(`${this.host}/categories/${id}`);
    }

    getRooms(id: number): Observable<Room[]> {
        return this.httpClient.get<Room[]>(`${this.host}/categories/${id}/rooms`);
    }

    create(category: Category) {
        return this.httpClient.post<Category>(`${this.host}/categories`, category);
    }
    
    update(category: Category) {
        return this.httpClient.put<any>(`${this.host}/categories/${category.id}`, category);
    }

    delete(id: number) {
        return this.httpClient.delete<Category>(`${this.host}/categories/${id}`);
    }

}