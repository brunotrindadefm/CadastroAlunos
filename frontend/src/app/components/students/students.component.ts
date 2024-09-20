import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../model/Student';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { differenceInYears, parseISO } from 'date-fns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];

  searchByName: string = '';

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
      this.getAllStudents();
  }
  
  age(isoDate?: string): number {
    const parsedDate = parseISO(isoDate!);
    const currentDate = new Date();
    
    const age = differenceInYears(currentDate, parsedDate);

    return age;

  };

  getAllStudents():void {
      this.studentsService.getAllStudents().subscribe(data => {
        this.students = data.map(student => ({
          ...student,
          showGrade: false
        }))
      });
  }

  deleteStudent(studentId: number ): void {
    if (confirm('Tem certeza de que deseja deletar este aluno?')) {
      this.studentsService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.studentId !== studentId);
      });
    }  
  }

  handleShowGrade(student: Student): void {
    student.showGrade = !student.showGrade;
  }

  getStudentsByName() {
    return this.students.filter(student => 
      student.name?.toLowerCase().includes(this.searchByName.toLowerCase())
    );
  }

}
