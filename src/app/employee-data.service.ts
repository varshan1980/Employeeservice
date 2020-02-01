import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  employees: Employee[];
  serviceURI: string = "http://localhost:50981/api/employees";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json', 'Accept':'application/json'})
  }
  configURL = "assets/config.json";

  constructor(private httpClient: HttpClient) {

    console.log(this.httpClient.get(this.configURL));

  }

  private getApiURL()
  {
     return this.httpClient.get(this.configURL);

  }
  private handleError<T>(operation = 'operation', result?: T)
  {
    return(error: any) : Observable<T> => {
      console.error(error);
      this.log(operation, error);
      return of(result as T);
      
    };
  }

  private log(method:string,message: string){
    localStorage.setItem(method,message);
  }

  getEmployeesFromService(): Observable<Employee[]> {
    console.log('executed again');
   return this.httpClient.get<Employee[]>(`${this.serviceURI}`)
          .pipe(
            tap(_ => this.log(`getEmployees`,`Operation success`)),
            catchError(this.handleError<Employee[]>('getEmployees',))
          )

  }

  getEmployeeById(id: number) : Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.serviceURI}/${id}`)
                .pipe(
                  tap(_ => this.log(`getEmployee`,'Opreation Sucess')),
                  catchError(this.handleError<Employee>('getEmployees',))
                )
  }

  putEmployee(updateemployee: Employee) {
      return this.httpClient.put(`${this.serviceURI}`,updateemployee,this.httpOptions)
      .pipe(
        catchError(this.handleError('updateEmployee'))
      );
  }

  deleteEmployee(deleteEmployee: Employee) {
    return this.httpClient.delete(`${this.serviceURI}/${deleteEmployee.id}`,this.httpOptions)
    .pipe(
          tap(_ => this.getEmployeesFromService()),
          catchError(this.handleError('deleteEemployee'))
        );
  }
}
