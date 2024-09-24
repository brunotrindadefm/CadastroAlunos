import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../model/Student';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { differenceInYears, parseISO } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, EditStudentComponent, ConfirmModalComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  studentToEdit: Student | null = null;
  searchByName: string = '';
  showModal: boolean = false;
  studentIdToDelete: number | null = null;
  studentNameToDelete: string | null = null;

  private snackbarService = inject(SnackbarService);

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  age(isoDate?: string): number {
    if (!isoDate) return 0;
    const parsedDate = parseISO(isoDate);
    return differenceInYears(new Date(), parsedDate);
  }

  handleShowGrade(student: Student): void {
    student.showGrade = !student.showGrade;
  }

  getAllStudents(): void {
    this.studentsService.getAllStudents().subscribe(data => {
      this.students = data.map(student => ({
        ...student,
        showGrade: false
      }));
    });
  }

  handleShowModal(student: Student): void {
    this.studentNameToDelete = student.name!;
    this.studentIdToDelete = student.studentId!;
    this.showModal = true;
  };

  handleConfirmModal(confirm: boolean): void {
    this.showModal = false;
    if (confirm && this.studentIdToDelete !== null) {
      this.deleteStudent(this.studentIdToDelete);
    }
  }

  deleteStudent(studentId: number): void {
    this.studentsService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(student => student.studentId !== studentId);
      this.snackbarService.showMessage('Aluno deletado com sucesso', 'Fechar', 'success');
    });
  };

  updateStudent(student: Student): void {
    this.studentsService.updateStudent(student).subscribe(() => {
      this.students = this.students.map(st => st.studentId === student.studentId ? student : st);
      this.studentToEdit = null;
      this.snackbarService.showMessage('Aluno editado com sucesso', 'Fechar', 'success');
    }, error => {
      this.handleError(error);
    });
  }

  handleEditingStudent(student: Student): void {
    this.studentToEdit = student;
  }

  handleCancel(): void {
    this.studentToEdit = null;
  }

  getStudentsByName(): Student[] {
    return this.students.filter(student =>
      (student.name?.toLowerCase().includes(this.searchByName.toLowerCase())) ||
      (student.lastName?.toLowerCase().includes(this.searchByName.toLowerCase()))
    );
  }

  private handleError(error: any): void {
    console.error('Erro ao inserir aluno:', error);
    const errorMessages = error.error?.errors;

    if (errorMessages) {
      // Exibe uma snackbar para mensagem de erro
      Object.keys(errorMessages).forEach(key => {
        const messages = errorMessages[key];
        messages.map((msg: any) => {
          this.snackbarService.showMessage(msg, 'Fechar', 'error');
        });
      });
    } else {
      // Se não houver mensagens de erro específicas, exibe uma mensagem padrão
      this.snackbarService.showMessage('Erro desconhecido', 'Fechar', 'error');
    }
  }
}
