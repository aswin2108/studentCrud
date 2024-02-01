import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { studentService } from 'src/app/services/student/student-data.service';
import { StudentData } from 'src/app/interfaces/studentData';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {

  newStudent: StudentData = {
    name: '',
    id:0,
    email: '',
    avatar: '',
    phone: '',
    mark1: 0,
    mark2: 0,
    mark3: 0,
    total:0,
    percentage:0,
    grade:'',
  };
  constructor(private router: Router, private dataService: studentService) {}

  addStudent(): void {
    // Calculate total, percentage, and grade before adding the student
    this.calculateResult();

    // Add validation or other logic as needed
    this.dataService.addStudent(this.newStudent).subscribe(
      (addedStudent) => {
        console.log('Student added successfully:', addedStudent);
        // Navigate back to the student list after successful addition
        this.router.navigate(['/student']);
      },
      (error) => {
        console.error('Error adding student:', error);
        // Handle error as needed
      }
    );
  }
  private calculateResult(): void {
    const mark1 = +this.newStudent.mark1;
  const mark2 = +this.newStudent.mark2;
  const mark3 = +this.newStudent.mark3;
    // Calculate total, percentage, and grade based on the three marks
    this.newStudent.total = mark1 + mark2 + mark3;
    this.newStudent.percentage = (this.newStudent.total / 300) * 100; // Assuming maximum marks for all three subjects is 100
    this.newStudent.grade = this.calculateGrade(this.newStudent.percentage);
  }

  private calculateGrade(percentage: number): string {
    // Implement your logic to calculate the grade based on the percentage
    // Example: A, B, C, etc.
    // ...

    // For simplicity, let's assume an arbitrary logic for grade calculation
    if (percentage >= 90) {
      return 'A';
    } else if (percentage >= 80) {
      return 'B';
    } else if (percentage >= 70) {
      return 'C';
    } else {
      return 'D';
    }
  }

  cancelAdd(): void {
    // Navigate back to the student list without adding a new student
    this.router.navigate(['/student']);
  }

}
