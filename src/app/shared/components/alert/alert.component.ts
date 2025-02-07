import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  get alertClass(): string {
    return this.type === 'success' ? 'alert-success' : 'alert-error';
  }
}