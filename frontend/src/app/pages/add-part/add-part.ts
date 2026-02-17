import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PartService } from '../../services/part.service';

// Custom validator for integer values
function integerValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value === null || control.value === '') return null;
  return Number.isInteger(control.value) ? null : { integer: true };
}

@Component({
  selector: 'app-add-part',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-part.html',
  styleUrl: './add-part.css',
})
export class AddPart {
  loading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  partForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    quantity: new FormControl<number | null>(null, [Validators.required, Validators.min(0), integerValidator]),
    minLevel: new FormControl<number | null>(null, [Validators.required, Validators.min(0), integerValidator]),
    unitPrice: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  constructor(private partService: PartService, private router: Router) { }

  onSubmit() {
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');

    const val = this.partForm.value;
    this.partService.addPart({
      name: val.name!,
      quantity: val.quantity!,
      minLevel: val.minLevel!,
      unitPrice: val.unitPrice!,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMsg.set('Part added successfully!');
        this.partForm.reset();
        setTimeout(() => this.router.navigate(['/inventory']), 1200);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.message || 'Failed to add part. Please try again.');
      }
    });
  }
}
