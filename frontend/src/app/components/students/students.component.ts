import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../model/Student';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { differenceInYears, parseISO } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, EditStudentComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  studentToEdit: Student | null = null;

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

  handleShowGrade(student: Student): void {
    student.showGrade = !student.showGrade;
  }

  getAllStudents(): void {
    this.studentsService.getAllStudents().subscribe(data => {
      this.students = data.map(student => ({
        ...student,
        showGrade: false
      }))
    });
  }

  deleteStudent(studentId: number): void {
    if (confirm('Tem certeza de que deseja deletar este aluno?')) {
      this.studentsService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.studentId !== studentId);
      });
    }
  }

  updateStudent(student: Student): void {
    this.studentsService.updateStudent(student).subscribe(() => {
      this.students = this.students.map(st => st.studentId === student.studentId ? student : st);
      this.studentToEdit = null;
    },  
      error => {
        console.error('Erro ao inserir aluno:', error);
        const errorMessages = error.error.errors; // Acesse o objeto de erros
        let message = 'Erro desconhecido';

        if (errorMessages) {
          // Concatena as mensagens de erro em uma string
          message = Object.keys(errorMessages)
            .map(key => `${key}: ${errorMessages[key].join(', ')}`)
            .join('\n');
        }

        alert(message);
      })

  };

  handleEditingStudent(student: Student): void {
    this.studentToEdit = student;
  };

  handleCancel(): void {
    this.studentToEdit = null;
  };

  getStudentsByName() {
    return this.students.filter(student =>
      student.name?.toLowerCase().includes(this.searchByName.toLowerCase())
    );
  }

}
