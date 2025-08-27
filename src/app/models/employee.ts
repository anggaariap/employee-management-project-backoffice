export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; 
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export interface ListState {
  pageIndex: number;
  pageSize: number;
  sortField: keyof Employee | '';
  sortDir: 'asc' | 'desc' | '';
  keyword: string;
  group: string;
}
