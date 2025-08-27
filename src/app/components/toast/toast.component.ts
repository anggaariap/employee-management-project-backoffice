import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngFor="let m of messages()"
         [ngClass]="{'toast-yellow': m.color==='yellow','toast-red': m.color==='red','toast-green': m.color==='green'}">
      {{m.text}}
    </div>
  `
})
export class ToastComponent {
  messages = this.toast.list;
  constructor(private toast: ToastService) {}
}
