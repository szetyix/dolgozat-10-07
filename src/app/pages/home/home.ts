import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly diagonalsForm = new FormGroup({
    firstDiagonal: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.0000000001),
    ]),
    secondDiagonal: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.0000000001),
    ]),
  });

  protected area: number | null = null;

  protected get formattedArea(): string {
    return this.area === null
      ? ''
      : new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 10 }).format(this.area);
  }

  protected calculateArea(): void {
    if (this.diagonalsForm.invalid) {
      this.diagonalsForm.markAllAsTouched();
      this.area = null;
      return;
    }

    const { firstDiagonal, secondDiagonal } = this.diagonalsForm.getRawValue();
    if (firstDiagonal === null || secondDiagonal === null) {
      this.area = null;
      return;
    }

    this.area = (firstDiagonal * secondDiagonal) / 2;
  }
}
