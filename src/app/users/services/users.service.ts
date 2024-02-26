import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, PaginatedUsers } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://reqres.in/api/users';

  constructor() {}

  http = inject(HttpClient);

  loadPage(page: number): Observable<User[]> {
    return this.http
      .get<PaginatedUsers>(this.baseUrl, { params: { page: page } })
      .pipe(map((response) => response.data));
  }
}
