import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.css'
]
})

export class EmployeesListComponent implements OnInit {
  employees:  Employee[];
  employee: Employee;

  constructor(private employeeData : EmployeeDataService) { 
    this.getEmployees();
  }

  ngOnInit() {
    
  }

  getEmployees() {
    this.employeeData.getEmployeesFromService().subscribe( e => this.employees = e);
  }

  getEmployeeById(selectedEmployee : Employee){

    this.employeeData.getEmployeeById(selectedEmployee.id).subscribe(e => this.employee = e);
  }

  removeEmployee(employee: Employee)
  {
    const i = this.employees.findIndex(e => e.id === employee.id);
    this.employeeData.deleteEmployee(employee).subscribe(() => this.employees.splice(i,1));
  }

}
