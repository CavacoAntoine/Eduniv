import { Course } from './course.model';
import {Teacher} from "./teacher.model";

describe('Course.Model', () => {
  it('should create an instance', () => {
    expect(new Course("","",0,"",new Teacher())).toBeTruthy();
  });
});
