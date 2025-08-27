import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { RupiahPipe } from '../../pipes/rupiah.pipe';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports: [CommonModule, RouterLink, RupiahPipe],
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;
  constructor(private route: ActivatedRoute, private emp: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.employee = this.emp.getByUsername(username);
  }

  back() {
    this.router.navigate(['/employees']);
  }

  formatDate(iso: string) {
    const d = new Date(iso);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('id-ID', options).format(d);
  }
}
