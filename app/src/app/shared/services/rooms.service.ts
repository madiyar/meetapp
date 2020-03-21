import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Room } from '../types/room.types';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Room[]> {
        return this.httpClient.get<Room[]>(`${this.host}/rooms`);
    }

    create(room: Room) {
        return this.httpClient.post<Room>(`${this.host}/rooms`, room);
    }
    
    getById(id: number) {
        return this.httpClient.get<Room>(`${this.host}/rooms/${id}`);
    }

    update(room: Room) {
        return this.httpClient.put<any>(`${this.host}/rooms/${room.id}`, room);
    }

}