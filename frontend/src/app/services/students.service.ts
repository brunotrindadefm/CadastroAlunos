import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/Student';

// Para configurar os headers para os métodos que precisam
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = 'http://localhost:5075/api/students'

  constructor(private http: HttpClient) { }

  // http cria uma instância do HttpClient que é usado para realizações de chamadas HTTP
  // Ele que fornece os métodos

  // Observable é pra trabalhar com fluxo de dados assíncronos

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(studentId: number): Observable<Student> {
    const apiUrlId = `${this.apiUrl}/${studentId}`;
    return this.http.get<Student>(apiUrlId);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, httpOptions);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.apiUrl, student, httpOptions);
  }

  deleteStudent(studentId: number): Observable<any> {
    const apiUrlId = `${this.apiUrl}/${studentId}`;
    return this.http.delete<number>(apiUrlId, httpOptions); 
  }
}
