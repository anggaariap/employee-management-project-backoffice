import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { RupiahPipe } from '../../pipes/rupiah.pipe';

type SortDir = 'asc'|'desc'|'';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink, FormsModule, ToastComponent, RupiahPipe],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  employees = this.empService.employees;
  state = this.empService.state;
  pageSizes = [5,10,20,50,100];

  filtered = computed(() => {
    const list = this.employees();
    const s = this.state();
    const keyword = s.keyword.trim().toLowerCase();
    const group = s.group.trim().toLowerCase();
    let out = list;
    if (keyword) {
      out = out.filter(e => (
        e.username.toLowerCase().includes(keyword) ||
        e.firstName.toLowerCase().includes(keyword) ||
        e.lastName.toLowerCase().includes(keyword) ||
        e.email.toLowerCase().includes(keyword)
      ));
    }
    if (group) {
      out = out.filter(e => e.group.toLowerCase().includes(group));
    }
    if (s.sortField) {
      const dir = s.sortDir === 'desc' ? -1 : 1;
      out = [...out].sort((a:any,b:any)=> (a[s.sortField!] > b[s.sortField!] ? 1 : a[s.sortField!] < b[s.sortField!] ? -1 : 0) * dir);
    }
    return out;
  });

  pageData = computed(() => {
    const s = this.state();
    const start = s.pageIndex * s.pageSize;
    return this.filtered().slice(start, start + s.pageSize);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.state().pageSize)));

  constructor(public empService: EmployeeService, private router: Router, private toast: ToastService) {}

  setSort(field: keyof Employee) {
    const { sortField, sortDir } = this.state();
    let newDir: SortDir = 'asc';
    if (sortField === field) {
      newDir = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? '' : 'asc';
    }
    this.empService.updateState({ sortField: newDir ? field : '', sortDir: newDir, pageIndex: 0 });
  }

  gotoPage(i: number) {
    const total = this.totalPages();
    if (i < 0 || i >= total) return;
    this.empService.updateState({ pageIndex: i });
  }

  onPageSizeChange(size: string) {
    const n = parseInt(size, 10);
    this.empService.updateState({ pageSize: n, pageIndex: 0 });
  }
}
