import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Author } from './pages/author/author';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'Főoldal | Feladat 0311' },
  { path: 'about', component: About, title: 'Névjegy | Feladat 0311' },
  { path: 'author', component: Author, title: 'Szerző | Feladat 0311' },
  { path: '**', redirectTo: 'home' },
];
