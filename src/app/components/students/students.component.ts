
import { Component, OnInit } from '@angular/core';
import { studentService } from 'src/app/services/student/student-data.service';
import { StudentData } from 'src/app/interfaces/studentData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: StudentData[] = [];

  constructor(private dataService: studentService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.students = result;
        } 
        console.log('Data received:', this.students);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  navigateToProfile(studentId: number): void {
    this.router.navigate(['/student', studentId]);
  }
}

