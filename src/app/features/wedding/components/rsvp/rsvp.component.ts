import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RsvpService } from '../../services/rsvp.service';
import { GuestService } from '../../services/guest.service';

export interface RSVPFormValue {
  attending: string;
  stayOvernight: string;
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
  private rsvpService = inject(RsvpService);
  private guestService = inject(GuestService);
  private destroyRef = inject(DestroyRef);

  submitted = signal(false);
  submitting = signal(false);
  submitError = signal(false);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      attending: ['', Validators.required],
      stayOvernight: [''],
      dietary: [''],
      message: [''],
    });

    this.form
      .get('attending')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((val) => {
        const ctrl = this.form.get('stayOvernight')!;
        if (val === 'yes') {
          ctrl.setValidators(Validators.required);
        } else {
          ctrl.clearValidators();
          ctrl.reset();
        }
        ctrl.updateValueAndValidity();
      });

    const existingRsvp = this.rsvpService.rsvp();
    if (existingRsvp) {
      this.form.patchValue({
        attending: existingRsvp.attending ? 'yes' : 'no',
        stayOvernight: existingRsvp.stay_the_night ? 'yes' : 'no',
        dietary: existingRsvp.dietary_requirements ?? '',
      });
      this.submitted.set(true);
    }
  }

  isAttending(): boolean {
    return this.form.get('attending')?.value === 'yes';
  }

  isNotAttending(): boolean {
    return this.form.get('attending')?.value === 'no';
  }

  isStayingOvernight(): boolean {
    return this.form.get('stayOvernight')?.value === 'yes';
  }

  isNotStayingOvernight(): boolean {
    return this.form.get('stayOvernight')?.value === 'no';
  }

  fieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  get dietary(): string {
    return this.form.get('dietary')?.value ?? '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const token = this.guestService.guest()?.token;
    if (!token) return;

    const { attending, stayOvernight, dietary } = this.form.value as RSVPFormValue;

    this.submitting.set(true);
    this.submitError.set(false);

    this.rsvpService
      .saveRsvp(token, {
        attending: attending === 'yes',
        stay_the_night: stayOvernight === 'yes',
        dietary_requirements: dietary ?? '',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (rsvp) => {
          this.rsvpService.setRsvp(rsvp);
          this.submitting.set(false);
          this.submitted.set(true);
        },
        error: () => {
          this.submitting.set(false);
          this.submitError.set(true);
        },
      });
  }

  resetForm(): void {
    this.submitted.set(false);
    this.submitError.set(false);
  }
}
