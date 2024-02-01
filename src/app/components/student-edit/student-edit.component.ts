import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { studentService } from 'src/app/services/student/student-data.service';
import { StudentData } from 'src/app/interfaces/studentData';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: StudentData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: studentService
  ) {}

  ngOnInit(): void {
    this.loadStudentDetails();
  }

  private loadStudentDetails(): void {
    const studentId = +this.route.snapshot.paramMap.get('id');
    this.dataService.getOneStudent(studentId).subscribe(
      (result) => {
        this.student = result;
        console.log('Edit Student Profile:', this.student);
      },
      (error) => {
        console.error('Error fetching student data for edit:', error);
      }
    );
  }

  updateStudent(): void {
    // Calculate total, percentage, and grade based on the three marks
    this.calculateResult();

    // Update student details
    this.dataService.updateStudentDetails(this.student).subscribe(
      (updatedStudent) => {
        console.log('Student details updated successfully:', updatedStudent);
        // Navigate back to the profile page after successful update
        this.router.navigate([`/student/${updatedStudent.id}`]);
      },
      (error) => {
        console.error('Error updating student details:', error);
        // Handle error as needed
      }
    );
  }


  cancelEdit(): void {
    // Navigate back to the profile page without making any changes
    this.router.navigate([`/student/${this.student.id}`]);
  }

  private calculateResult(): void {
    const mark1 = +this.student.mark1;
    const mark2 = +this.student.mark2;
    const mark3 = +this.student.mark3;
  
    this.student.total = mark1 + mark2 + mark3;
    this.student.percentage = (this.student.total / 300) * 100; 
    this.student.grade = this.calculateGrade(this.student.percentage);
  }
  
  /**
   * This function calculates the grade using percentage mark scored
   * @param {percentage} p - Any number
   * @returns {string} - The grade the student got
   */
  
  private calculateGrade(percentage: number): string {
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
}


