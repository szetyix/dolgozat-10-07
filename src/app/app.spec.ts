import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render each routed page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;

    for (const [path, heading] of [
      ['/home', 'Feladat 0311'],
      ['/about', 'Névjegy'],
      ['/author', 'Szerző'],
    ]) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('h1')?.textContent).toContain(heading);
    }
  });
});
