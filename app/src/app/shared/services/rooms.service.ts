import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Room } from '../types/room.types';
import { environment } from '../../../environments/environment';
import { Meeting } from '../types/meeting.types';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Room[]> {
        return this.httpClient.get<Room[]>(`${this.host}/rooms`);
    }

    getById(id: number) {
        return this.httpClient.get<Room>(`${this.host}/rooms/${id}`);
    }

    getMeetings(id: number): Observable<Meeting[]> {
        return this.httpClient.get<Meeting[]>(`${this.host}/rooms/${id}/meetings`);
    }

    create(room: Room) {
        return this.httpClient.post<Room>(`${this.host}/rooms`, room);
    }

    update(room: Room) {
        return this.httpClient.put<any>(`${this.host}/rooms/${room.id}`, room);
    }

    delete(id: number) {
        return this.httpClient.delete<any>(`${this.host}/rooms/${id}`);
    }

}