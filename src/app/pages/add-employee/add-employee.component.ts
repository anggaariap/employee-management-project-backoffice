import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastService } from '../../services/toast.service';

function notFutureDate(c: AbstractControl): ValidationErrors | null {
  const v = c.value;
  if (!v) return null;
  const picked = new Date(v);
  const now = new Date();
  if (picked.getTime() > now.getTime()) return { future: true };
  return null;
}

function numeric(c: AbstractControl): ValidationErrors | null {
  const v = c.value;
  if (v === null || v === undefined || v === '') return null;
  return isNaN(Number(v)) ? { numeric: true } : null;
}

@Component({
  standalone: true,
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastComponent],
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  groups = this.empService.groupsList();
  groupFilter = signal('');

  form = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, notFutureDate]],
    basicSalary: ['', [Validators.required, numeric]],
    status: ['', Validators.required],
    group: ['', Validators.required],
    description: ['', Validators.required],
  });

  get filteredGroups() {
    const f = this.groupFilter().toLowerCase();
    return this.groups.filter(g => g.toLowerCase().includes(f));
  }

  maxDateTimeLocal: string;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private toast: ToastService
  ) {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    this.maxDateTimeLocal = local.toISOString().slice(0, 16);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    try {
      this.empService.addEmployee({
        username: String(v.username),
        firstName: String(v.firstName),
        lastName: String(v.lastName),
        email: String(v.email),
        birthDate: new Date(String(v.birthDate)).toISOString(),
        basicSalary: Number(v.basicSalary),
        status: String(v.status),
        group: String(v.group),
        description: String(v.description),
      });
      this.toast.show('Employee berhasil ditambahkan', 'green');
      this.router.navigate(['/employees']);
    } catch (e: any) {
      this.toast.show(e.message || 'Gagal menambahkan employee', 'red');
    }
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}