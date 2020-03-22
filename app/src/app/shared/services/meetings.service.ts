import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Meeting } from '../types/meeting.types';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Meeting[]> {
        return this.httpClient.get<Meeting[]>(`${this.host}/meetings`);
    }

    getFreeEntry(): Observable<Meeting[]> {
        return this.httpClient.get<Meeting[]>(`${this.host}/meetings/free-entry`);
    }

    getCanceled(): Observable<Meeting[]> {
        return this.httpClient.get<Meeting[]>(`${this.host}/meetings/canceled`);
    }

    // getParticipans()

    create(meeting: Meeting) {
        return this.httpClient.post<Meeting>(`${this.host}/meetings`, meeting);
    }
    
    getById(id: number) {
        return this.httpClient.get<Meeting>(`${this.host}/meetings/${id}`);
    }

    update(meeting: Meeting) {
        return this.httpClient.put<any>(`${this.host}/meetings/${meeting.id}`, meeting);
    }

    // delete()

}