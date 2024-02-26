import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from './services/users.service';
import { User } from './interfaces/users';
import { filter } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  public usersService = inject(UsersService);
  public users = signal<User[]>([]);
  public currentPage = signal(1);
  public totalUsers = computed(
    () => `Total de usuarios ${this.users().length}`
  );

  constructor() {}

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number) {
    this.usersService
      .loadPage(page)
      .pipe(filter((users) => users.length > 0))
      .subscribe((data) => {
        this.users.update((currentUsers) => [...currentUsers, ...data]);
        this.currentPage.set(page);
      });

    /* this.usersService
      .loadPage(page)
      .pipe(filter((data) => data.length > 0))
      .subscribe((users) => {
        console.log('users', this.users);
        this.users = users;
        this.currentPage = page;
      }); */
  }
}
