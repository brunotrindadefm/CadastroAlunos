import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../model/Student';
import { format } from 'date-fns';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent implements OnInit {

  @Input() student!: Student;
  @Output() save = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl(this.student.name),
        lastName: new FormControl(this.student.lastName),
        dateOfBirth: new FormControl(this.student.dateOfBirth ? format(new Date (this.student.dateOfBirth), 'dd/MM/yyyy') : ''),
        grade1: new FormControl(this.student.grade1),
        grade2: new FormControl(this.student.grade2),
        institutionalGrade: new FormControl(this.student.institutionalGrade),
        activities: new FormControl(this.student.activities)
      });
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedStudent: Student = { 
        ...this.student,
         ...this.form.value,
          dateOfBirth: this.convertDateToISO(this.form.value.dateOfBirth),
          totalGrade: this.calculateTotalGrade(this.form.value)
        };
      this.save.emit(updatedStudent);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  convertDateToISO(date: string): string {
    const [day, month, year] = date.split('/'); 
    return new Date (`${year}-${month}-${day}T00:00:00Z`).toISOString();
  }

  calculateTotalGrade(formValue: any): number {
    const { grade1, grade2, institutionalGrade, activities} = formValue;
    return (grade1 || 0) + (grade2 || 0) + (institutionalGrade || 0) + (activities || 0);
  }

}
