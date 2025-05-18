import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Testimonial {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      description:
        'Working with this team was a game changer for our business.',
      image: 'DSC_0525-2.jpg',
    },
    {
      name: 'David Smith',
      description:
        'Incredible service and attention to detail. Highly recommended!',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    {
      name: 'Emily Carter',
      description: 'Our website traffic doubled thanks to their expertise.',
      image: 'https://i.pravatar.cc/150?img=28',
    },
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }
}
