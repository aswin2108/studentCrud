import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { studentService } from 'src/app/services/student/student-data.service';
import { StudentData } from 'src/app/interfaces/studentData';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{
  student: StudentData;

  constructor(private route: ActivatedRoute, private dataService: studentService, private router: Router,) {}

  ngOnInit(): void {
    this.loadStudentDetails();
  }
  private loadStudentDetails(): void{
    const studentId = +this.route.snapshot.paramMap.get('id');
    console.log(studentId);
    console.log(this.dataService.getOneStudent(studentId));
    this.dataService.getOneStudent(studentId).subscribe(
      (result) => {
        this.student = result;
        console.log('Student Profile:', this.student);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  deleteStudent(): void {
    const confirmation = window.confirm('Are you sure you want to delete this student?');
    if(confirmation){
    const studentId = this.student.id;
    this.dataService.deleteStudent(studentId).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.router.navigate(['/student']);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}


}

