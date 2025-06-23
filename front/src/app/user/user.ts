import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-component',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  formSubmitted = false;

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    identification: ['', Validators.required],
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
    this.formSubmitted = true;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const user = this.userForm.getRawValue();

    if (!this.idUser) {
      this.userService.createUser(user).subscribe({
        next: (response) => {
          console.log('Creado exitosamente: ', response);
          this.userForm.reset();
          this.formSubmitted = false;
        },
        error: (error) => {
          console.error('Ha ocurrido un error :', error);
        },
      });
    } else {
      this.userService.updateUser(this.idUser, user).subscribe({
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
