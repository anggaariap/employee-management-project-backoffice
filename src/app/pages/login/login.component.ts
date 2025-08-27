import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  hide = true;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: ToastService) {}

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    if (this.auth.login(String(username), String(password))) {
      this.toast.show('Login berhasil', 'green');
      this.router.navigate(['/employees']);
    } else {
      this.toast.show('Login gagal: username/password salah', 'red');
    }
  }
}
