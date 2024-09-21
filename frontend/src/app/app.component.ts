import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentsComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CdA';

    @ViewChild(StudentsComponent) studentsComponents!: StudentsComponent;

    addStudent() {
      this.studentsComponents.getAllStudents()
    };
}
