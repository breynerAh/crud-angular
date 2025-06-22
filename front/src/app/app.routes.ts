import { Routes } from '@angular/router';
import { UserComponent } from './user/user';
import { ListComponent } from './list/list';

export const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'edit/:id', component: UserComponent },
  { path: 'list', component: ListComponent },
];
