import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  navegar(rota: string) {
    this.router.navigate([rota]).then(() => {
      this.cdr.detectChanges();
    });
  }
}