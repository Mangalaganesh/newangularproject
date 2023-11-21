import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  public addstudent(obj:FormData){
    let url = "http://localhost:8080/students/add";
    
    // this.http.post(`${this.apiUrl}`, formdata, { headers: headers, observe: 'response', responseType: 'text' })
    return this.http.post(url,obj,{
      headers:{
              //  'content-type': 'application/json',
              //  'Accept': 'multipart/form-data',
               'Accept': 'application/json',
               
              //  'Accept':'application/json'
      
             },observe: 'response', responseType: 'text'});
  }

  public getstudent(){
    let url = "http://localhost:8080/students/getall";
    return this.http.get(url,{
      headers:{
        'content-type': 'application/json',
        'Accept':'application/json'

      }
    });
  }

  updateEmployee(studentData: any): Observable<any> {
    console.log("putmethod>>>>>>>",studentData);
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const updateUrl = `http://localhost:8080/students/update/${studentData.id}`; // Assuming you have an API endpoint for updating students

    // Make an HTTP PUT request to update student details
    return this.http.put(updateUrl, studentData, { responseType:'text' });
}

getById(studentId: number): Observable<Student> {
  console.log("getbyid>>>>>>>");
  const url = `http://localhost:8080/students/getbyid/${studentId}`;
  return this.http.get<Student>(url);
}


  
deleteStudent(student_id:number):Observable<any>{
  const deleteUrl = `http://localhost:8080/students/delete/${student_id}`;
  return this.http.delete(deleteUrl, { responseType: 'text' });
}  




 









}
