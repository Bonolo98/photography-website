import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent {
  showModal = false;
  currentStep = 1; // 1 = package details, 2 = booking form
  isSubmitting = false;
  submissionError: string | null = null;
  submissionSuccess = false;
  bookingForm: any;

  // Replace with your Formspree form ID
  formspreeUrl = 'https://formspree.io/f/mjkypyyy';

  // Replace with your WhatsApp Cloud API credentials
  whatsappCloudApiUrl =
    'https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages';
  whatsappToken = 'YOUR_WHATSAPP_TOKEN';

  // bookingForm = {
  //   name: '',
  //   email: '',
  //   phone: '',
  //   message: '',
  // };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      subject: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  selectedPackage: any = null;

  packages: { [key: string]: any } = {
    'standard-portrait': {
      title: 'BEGINNER PACKAGE',
      price: 'R500',
      details: [
        '1 HOUR PHOTOSHOOT',
        '30 EDITED IMAGES',
        'TRANSPORT NEGOTIABLE BASED ON LOCATION',
        'DELIVER FINAL IMAGES: EMAIL',
      ],
    },
    // Add other packages similarly
    'standard-event': {
      title: 'BRONZE PACKAGE',
      price: 'R1400',
      details: [
        '2 HOUR PHOTOSHOOT',
        '50 EDITED IMAGES',
        'TRANSPORT NEGOTIABLE BASED ON LOCATION',
        'DELIVER FINAL IMAGES: EMAIL',
      ],
    },
  };

  openModal(packageId: string) {
    this.selectedPackage = this.packages[packageId];
    this.currentStep = 1;
    this.showModal = true;
    this.resetForm();
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  nextStep() {
    this.currentStep = 2;
  }

  resetForm() {
    this.bookingForm = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    this.submissionError = null;
    this.submissionSuccess = false;
  }

  async submitBooking() {
    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    try {
      // Validate form
      if (
        !this.bookingForm.name ||
        !this.bookingForm.email ||
        !this.bookingForm.phone
      ) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare Formspree payload
      const formData = new FormData();
      formData.append('name', this.bookingForm.name);
      formData.append('email', this.bookingForm.email);
      formData.append('phone', this.bookingForm.phone);
      formData.append('message', this.bookingForm.message || 'No message');
      formData.append('package', this.selectedPackage.title);
      formData.append('price', this.selectedPackage.price);
      formData.append('_subject', `New Booking: ${this.selectedPackage.title}`);

      // Send to Formspree
      await this.http.post(this.formspreeUrl, formData).toPromise();

      // Send WhatsApp message: FIX ONCE YOU RECEIVE CLOUD API EMAIL FROM META
      // await this.sendWhatsAppMessage();

      this.submissionSuccess = true;
      setTimeout(() => this.closeModal(), 5000);
    } catch (error) {
      console.error('Booking submission error:', error);
      this.submissionError =
        error instanceof Error ? error.message : 'Failed to submit booking';
    } finally {
      this.isSubmitting = false;
    }
  }

  private async sendWhatsAppMessage() {
    const message =
      `New Booking:\n\n` +
      `Name: ${this.bookingForm.name}\n` +
      `Email: ${this.bookingForm.email}\n` +
      `Phone: ${this.bookingForm.phone}\n\n` +
      `Package: ${this.selectedPackage.title}\n` +
      `Price: ${this.selectedPackage.price}\n\n` +
      `Message: ${this.bookingForm.message || 'No additional message'}`;

    const response = await fetch(this.whatsappCloudApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '27648621677', // With country code, e.g. "27648621677"
        type: 'text',
        text: { body: message },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }
  }
}
