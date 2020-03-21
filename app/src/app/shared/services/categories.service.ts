import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '../types/category.types';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.host}/categories`);
    }

    create(category: Category) {
        return this.httpClient.post<Category>(`${this.host}/categories`, category);
    }
    
    getById(id: number) {
        return this.httpClient.get<Category>(`${this.host}/categories/${id}`);
    }

    update(category: Category) {
        return this.httpClient.put<any>(`${this.host}/categories/${category.id}`, category);
    }

}