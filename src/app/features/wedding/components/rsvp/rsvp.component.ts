import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

export interface RSVPFormValue {
  attending: string;
  dietary: string;
  message: string;
}

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
})
export class RsvpComponent {
  submitted = signal(false);
  submitting = signal(false);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      attending: ['', Validators.required],
      dietary: [''],
      message: [''],
    });
  }

  isAttending(): boolean {
    return this.form.get('attending')?.value === 'yes';
  }

  isNotAttending(): boolean {
    return this.form.get('attending')?.value === 'no';
  }

  fieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // Simulate async submission — replace with actual API call
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      console.log('RSVP submitted:', this.form.value as RSVPFormValue);
    }, 1500);
  }

  resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }
}
