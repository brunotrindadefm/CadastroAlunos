import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../model/Student';
import { StudentsService } from '../../services/students.service';
import { parse, formatISO } from 'date-fns';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  form: any;

  constructor(private studentsService: StudentsService) { }

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
          alert('Aluno inserido com sucesso');
          this.form.reset();
        },
        error => {
          console.error('Erro ao inserir aluno:', error);
          alert('Erro ao inserir aluno');
        })
  };
}
