import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent, ModalContent } from './employee-details/employee-details.component';
import { EmployeeDataService } from './employee-data.service';

import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './employees-list/employees-list.component';
//import { ModalComponent, ModalContent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
    ModalContent
  ],
  entryComponents: [ModalContent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [EmployeeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
