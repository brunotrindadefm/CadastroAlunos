import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { Student } from '../../model/Student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

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
  }

  sendForm(): void {
    if (this.form.value > 0) {
      const student: Student = this.form.value;
      this.studentsService.createStudent(student).subscribe(result => {
        alert('Aluno inserido com sucesso');
        this.form.reset(); 
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

}
