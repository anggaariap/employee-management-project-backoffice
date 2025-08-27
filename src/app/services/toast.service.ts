import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  color: 'yellow' | 'red' | 'green';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _list = signal<ToastMessage[]>([]);
  get list() { return this._list.asReadonly(); }

  show(text: string, color: 'yellow' | 'red' | 'green' = 'green', ttlMs = 2500) {
    const id = Math.floor(Math.random()*1e9);
    const msg: ToastMessage = { id, text, color };
    this._list.update(arr => [...arr, msg]);
    setTimeout(() => this.dismiss(id), ttlMs);
  }
  dismiss(id: number) {
    this._list.update(arr => arr.filter(m => m.id !== id));
  }
}
