import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent implements OnInit {
  usersData: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.usersData = data;
    });
  }

  columns = ['identification', 'name', 'email', 'actions'];

  router = inject(Router);

  edit(row: any): void {
    this.router.navigate(['/edit', row.identification]);
  }
  delete(row: any): void {
    this.userService.deleteUser(row.identification).subscribe({
      next: (response) => {
        console.log('Eliminado exitosamente: ', response);
        this.userService.getUsers().subscribe((data) => {
          this.usersData = data;
        });
      },
      error: (error) => {
        console.error('Ha ocurrido un error :', error);
      },
    });
  }
}
