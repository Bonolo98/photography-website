import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  activeTab: string = 'portraits';

  events = [
    {
      id: 1,
      imgUrl:
        'https://images.unsplash.com/photo-1613005798967-632017e477c8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '',
    },
    {
      id: 2,
      imgUrl:
        'https://images.unsplash.com/photo-1613005798967-632017e477c8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '',
    },
    {
      id: 3,
      imgUrl:
        'https://images.unsplash.com/photo-1613005798967-632017e477c8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '',
    },
    {
      id: 4,
      imgUrl:
        'https://images.unsplash.com/photo-1613005798967-632017e477c8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '',
    },
  ];

  portraits = [
    {
      id: 1,
      imgUrl: 'IMG_1243.jpg',
      description: '',
    },
    {
      id: 2,
      imgUrl: 'IMG_1177.jpg',
      description: '',
    },
    {
      id: 3,
      imgUrl: 'DSC_0299.jpg',
      description: '',
    },
    {
      id: 4,
      imgUrl: 'DSC_0552.jpg',
      description: '',
    },
    {
      id: 5,
      imgUrl: 'DSC_0552.jpg',
      description: '',
    },
    {
      id: 6,
      imgUrl: 'DSC_0552.jpg',
      description: '',
    },
    {
      id: 7,
      imgUrl: 'DSC_0552.jpg',
      description: '',
    },
    {
      id: 8,
      imgUrl: 'DSC_0552.jpg',
      description: '',
    },
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
