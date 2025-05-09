import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;

  navLinks = [
    { path: '/home', label: 'HOME' },
    { path: '/packages', label: 'PACKAGES' },
    { path: '/portfolio', label: 'PORTFOLIO' },
    { path: '/about', label: 'ABOUT' },
    { path: '/policy', label: 'BOOKING POLICY' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contacts', label: 'CONTACTS' },
  ];
}
