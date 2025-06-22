import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-component',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    identification: new FormControl(''),
  });

  router = inject(Router);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  idUser?: string;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idUser = id;
      this.userForm.get('identification')?.disable();
      this.loadUser(id);
    }
  }

  onSubmit() {
    if (!this.idUser) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('Creado exitosamente: ', response);
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Ha ocurrido un error :', error);
        },
      });
    } else {
      this.userService.updateUser(this.idUser, this.userForm.value).subscribe({
        next: (response) => {
          console.log('Actualizado exitosamente: ', response);
          this.userForm.reset();
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.error('Ha ocurrido un error :', error);
        },
      });
    }
  }

  loadUser(id: string): void {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          identification: user.identification,
        });
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      },
    });
  }
}
