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
      ['/home', 'Rombusz területe'],
      ['/about', 'Névjegy'],
      ['/links', 'Linkek'],
    ]) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('h1')?.textContent).toContain(heading);
    }
  });

  it('should show the requested information on the about page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/about');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nagy Szemere');
    expect(compiled.textContent).toContain('SZOFT-I-N');
    expect(compiled.textContent).toContain('Angular projekt');
  });

  it('should show both requested links on the links page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/links');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.link-list a');
    expect(links).toHaveLength(2);
    expect(links[0].href).toBe(
      'https://szit.hu/doku.php?id=oktatas:programozas:feladatok:altalanos#feladat_0311',
    );
    expect(links[1].href).toBe('https://www.w3schools.com/Angular/angular_first_app.asp');
  });

  it('should calculate the rhombus area on the home page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/home');
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
    await router.navigateByUrl('/home');
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
