import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  contactForm: FormGroup;
  isSuccess = false;
  isError = false;

  dropdownOpen = false;
  selectedOption: string = '';
  subjects: string[] = ['ENQUIRIES', 'BOOKINGS '];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      subject: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectSubject(subject: string) {
    this.contactForm.get('subject')?.setValue(subject);
    this.dropdownOpen = false;
  }

  get selectedSubject() {
    return this.contactForm.get('subject')?.value;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const formUrl = 'https://formspree.io/f/mjkypyyy';

    this.http.post(formUrl, this.contactForm.value).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isError = false;
        this.contactForm.reset();
      },
      error: () => {
        this.isSuccess = false;
        this.isError = true;
      },
    });
  }
}
