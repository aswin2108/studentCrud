import { TestBed } from '@angular/core/testing';

import { studentService } from './student-data.service';

describe('StudentDataService', () => {
  let service: studentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(studentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
