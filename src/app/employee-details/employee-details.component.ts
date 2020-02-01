import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeDataService } from '../employee-data.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Hi {{employeedetail.name}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div *ngIf="employeedetail" class="container">
      <div>
        Name: <input class="form-control ml-2" type="text" [(ngModel)]="empName">
      </div> 
      <div>
        Email: <input class="form-control ml-2" [(ngModel)]="empEmail" type="text">
      </div>
      <div>Department: {{employeedetail.departmentId}}</div>
      <div>Employee Id: {{employeedetail.id}}</div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="updateEmployee(employeedetail)">Update</button>
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
`
})

export class ModalContent {
  @Input() employeedetail: Employee;
  empName: string;
  empEmail: string;

  constructor(public activeModal: NgbActiveModal, public employeeData: EmployeeDataService) {

  }

  updateEmployee(employee: Employee) {
    employee.name = this.empName;
    employee.email = this.empEmail;
    this.employeeData.putEmployee(employee).subscribe();
    this.activeModal.close('Close click');
  }
}


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: [
    './employee-details.component.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;

  constructor(private employeeData: EmployeeDataService, private modalService: NgbModal) {

  }

  ngOnInit() {
  }

  open(selectedEmployee: Employee) {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.employeedetail = selectedEmployee;
    modalRef.componentInstance.empName = selectedEmployee.name;
    modalRef.componentInstance.empEmail = selectedEmployee.email;
  }

}
