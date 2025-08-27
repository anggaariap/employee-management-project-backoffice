import { Injectable, signal } from '@angular/core';
import { Employee, ListState } from '../models/employee';

function randomItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private groups = [
    'Engineering','QA','Design','HR','Finance','Marketing','Sales','Support','Ops','IT'
  ];
  private statuses = ['Active','Inactive','Probation','Leave'];

  private _employees = signal<Employee[]>(this.seedEmployees());
  // persist list state across navigations
  private _state = signal<ListState>({
    pageIndex: 0,
    pageSize: 10,
    sortField: '',
    sortDir: '',
    keyword: '',
    group: ''
  });

  get employees() { return this._employees.asReadonly(); }
  get state() { return this._state.asReadonly(); }
  updateState(patch: Partial<ListState>) {
    this._state.update(s => ({...s, ...patch}));
  }

  groupsList() { return [...this.groups]; }
  statusesList() { return [...this.statuses]; }

  addEmployee(emp: Employee) {
    const exists = this._employees().some(e => e.username.toLowerCase() === emp.username.toLowerCase());
    if (exists) throw new Error('Username already exists');
    this._employees.update(list => [emp, ...list]);
  }

  getByUsername(username: string): Employee | undefined {
    return this._employees().find(e => e.username === username);
  }

  private seedEmployees(): Employee[] {
    const first = ['Adi','Budi','Citra','Dewi','Eka','Fajar','Gita','Hadi','Intan','Joko','Kirana','Luthfi','Maya','Nanda','Oki','Putri','Rizky','Sari','Taufik','Umar','Vina','Wawan','Yusuf','Zahra'];
    const last = ['Pratama','Wijaya','Saputra','Siregar','Santoso','Halim','Ananda','Herlambang','Gunawan','Mulyani','Sutanto','Hasan','Putra','Nugroho','Hadiyanto','Kusuma','Pamungkas','Mahendra','Fauzi','Wibowo'];
    const domains = ['example.com','mail.com','corp.id','company.co.id'];
    const list: Employee[] = [];
    for (let i=0;i<120;i++){
      const fn = randomItem(first);
      const ln = randomItem(last);
      const username = (fn[0] + ln).toLowerCase() + i;
      const email = `${username}@${randomItem(domains)}`;
      const group = randomItem(this.groups);
      const status = randomItem(this.statuses);
      const salary = Math.floor(4_000_000 + Math.random()*20_000_000);
      const birthYear = 1965 + Math.floor(Math.random()*30);
      const birthMonth = 1 + Math.floor(Math.random()*12);
      const birthDay = 1 + Math.floor(Math.random()*28);
      const birthDate = new Date(birthYear, birthMonth-1, birthDay, 9, 0, 0).toISOString();
      list.push({
        username, firstName: fn, lastName: ln, email,
        birthDate, basicSalary: salary, status, group,
        description: `Karyawan ${fn} ${ln} bergabung di divisi ${group}.`
      });
    }
    return list;
  }
}
