package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.message.response.ResponseMessage;
import pl.dmcs.springbootjsp_iwa.model.Course;
import pl.dmcs.springbootjsp_iwa.model.Grade;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.model.Teacher;
import pl.dmcs.springbootjsp_iwa.repository.CourseRepository;
import pl.dmcs.springbootjsp_iwa.repository.GradeRepository;
import pl.dmcs.springbootjsp_iwa.repository.StudentRepository;
import pl.dmcs.springbootjsp_iwa.repository.TeacherRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/course")
public class CourseRESTController {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final GradeRepository gradeRepository;

    @Autowired
    public CourseRESTController(CourseRepository courseRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, GradeRepository gradeRepository) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.gradeRepository = gradeRepository;
    }

    @GetMapping
    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Course findCourseByCode(@PathVariable("id") String code){
        return courseRepository.findByCode(code);
    }

    @GetMapping("/student/{id}")
    public List<Course> findCoursesForStudent(@PathVariable("id") long studentId ) {
        if(!this.studentRepository.existsById(studentId)) {
            return null;
        } else {
            Student student = this.studentRepository.findById(studentId);
            return this.courseRepository.findCoursesByStudents(student);
        }
    }

    @GetMapping("/teacher/{id}")
    public List<Course> findCoursesForTeacher(@PathVariable("id") long teacherId ) {
        if(!this.teacherRepository.existsById(teacherId)) {
            return null;
        } else {
            Teacher teacher = this.teacherRepository.findById(teacherId);
            return this.courseRepository.findCoursesByTeacher(teacher);
        }
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> updateCourse(@RequestBody Course course, @PathVariable("id") String code) {
        Course updateCourse = this.courseRepository.findByCode(code);
        if (( updateCourse.getMaximumPlaces() - updateCourse.getAvailablePlaces()) > course.getMaximumPlaces())
            return new ResponseEntity<>(new ResponseMessage("Fail -> Num student > Maximum Places."), HttpStatus.BAD_REQUEST);
        updateCourse.setName(course.getName());
        updateCourse.setDescription(course.getDescription());
        updateCourse.setMaximumPlaces(course.getMaximumPlaces());
        this.courseRepository.save(updateCourse);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/addStudent/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> addStudentToCourse(@RequestBody Student student, @PathVariable("id") String code) {
        Course updateCourse = this.courseRepository.findByCode(code);
        Student newStudent = this.studentRepository.findById(student.getId());
        for (Student actualStudent : updateCourse.getStudents()){
            if(actualStudent.getId() == newStudent.getId()){
                return new ResponseEntity<>(new ResponseMessage("Fail -> Student already in this class."), HttpStatus.BAD_REQUEST);
            }
        }
        updateCourse.setAvailablePlaces(updateCourse.getAvailablePlaces()-1);
        updateCourse.getStudents().add(newStudent);
        this.courseRepository.save(updateCourse);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        if(this.courseRepository.existsByCode(course.getCode())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Code is already taken."), HttpStatus.BAD_REQUEST);
        }
        this.courseRepository.save(course);
        return new ResponseEntity<>(course, HttpStatus.CREATED);
    }

    @DeleteMapping("/{code}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCourse(@PathVariable("code") String code) {
        Course course = this.courseRepository.findByCode(code);
        List<Grade> deleteGrades = new ArrayList<>();
        for(Student student : course.getStudents()) {
            for(Grade grade : student.getGrades()) {
                if(grade.getCourse().getCode().equals(code)){
                    student.getGrades().remove(grade);
                    deleteGrades.add(grade);
                }
            }
        }
        this.studentRepository.saveAll(course.getStudents());
        this.gradeRepository.deleteAll(deleteGrades);
        this.courseRepository.delete(course);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
