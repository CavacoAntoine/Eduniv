import { Component, OnInit } from '@angular/core';
import {Grade} from "../model/grade";
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../services/student.service";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-view-grade',
  templateUrl: './view-grade.component.html',
  styleUrls: ['./view-grade.component.css']
})
export class ViewGradeComponent implements OnInit {

  gradeList : Array<Grade>;
  gradeSearchList : Array<Grade>;

  constructor(private activatedRoute : ActivatedRoute, private studentService : StudentService, private tokenStorage : TokenStorageService) {
    this.gradeSearchList = new Array<Grade>();
    this.gradeList = new Array<Grade>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.studentService.getGradeForCourse(<string>params.get('code'), this.tokenStorage.getUsername()).subscribe(grades =>{
        this.gradeList = grades;
        this.gradeSearchList = this.gradeList;
      })
    });
  }

  search(event: KeyboardEvent){
    let searchString : string = (<HTMLInputElement>event.target).value;
    if (searchString == null || searchString == "") {
      this.gradeSearchList = this.gradeList;
    } else {
      this.gradeSearchList = this.gradeList.filter(function (value, index, array) {
        return value.title.startsWith(searchString);
      });
    }
  }

}
