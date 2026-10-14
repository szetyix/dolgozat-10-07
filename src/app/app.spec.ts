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
      ['/author', 'Rombusz területe'],
    ]) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('h1')?.textContent).toContain(heading);
    }
  });

  it('should calculate the rhombus area from its diagonals', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/author');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstDiagonal = compiled.querySelector<HTMLInputElement>('#first-diagonal');
    const secondDiagonal = compiled.querySelector<HTMLInputElement>('#second-diagonal');
    const submitButton = compiled.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (firstDiagonal === null || secondDiagonal === null || submitButton === null) {
      throw new Error('The diagonal form controls were not rendered.');
    }

    firstDiagonal.value = '8';
    firstDiagonal.dispatchEvent(new Event('input'));
    secondDiagonal.value = '6';
    secondDiagonal.dispatchEvent(new Event('input'));
    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelector('.result strong')?.textContent).toContain('24');
  });

  it('should show validation errors when diagonals are missing', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/author');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitButton === null) {
      throw new Error('The diagonal form submit button was not rendered.');
    }
    submitButton.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('[role="alert"]')).toHaveLength(2);
    expect(compiled.querySelector('.result')).toBeNull();
  });
});
