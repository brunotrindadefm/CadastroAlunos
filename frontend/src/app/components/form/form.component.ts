import { Component, inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../model/Student';
import { StudentsService } from '../../services/students.service';
import { parse, formatISO } from 'date-fns';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  private snackbarService = inject(SnackbarService);

  constructor(private studentsService: StudentsService) { }

  @Output() formSubmitted = new EventEmitter<Student>();

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      dateOfBirth: new FormControl(null),
      grade1: new FormControl(null),
      grade2: new FormControl(null),
      institutionalGrade: new FormControl(null),
      activities: new FormControl(null),
    })
  };

  sendForm(): void {
    const formValue = this.form.value;
    const student: Student = formValue;

    const dateOfBirth = formValue.dateOfBirth;

    if (dateOfBirth) {
      const parsedDate = parse(dateOfBirth, 'dd/MM/yyyy', new Date());
      formValue.dateOfBirth = formatISO(parsedDate);
    }
    this.studentsService.createStudent(student).subscribe(
      result => {
        this.formSubmitted.emit(student);
        this.snackbarService.showMessage('Aluno inserido com sucesso!', 'Fechar', 'success');
        this.form.reset();
      },
      error => {
        this.handleError(error)
      }
    )
  };

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
