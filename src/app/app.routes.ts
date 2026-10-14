import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Links } from './pages/links/links';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'Rombusz területe | Feladat 0311' },
  { path: 'about', component: About, title: 'Névjegy | Feladat 0311' },
  { path: 'links', component: Links, title: 'Linkek | Feladat 0311' },
  { path: 'author', pathMatch: 'full', redirectTo: 'links' },
  { path: '**', redirectTo: 'home' },
];
