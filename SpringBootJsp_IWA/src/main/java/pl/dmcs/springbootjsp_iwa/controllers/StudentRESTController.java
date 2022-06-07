package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Course;
import pl.dmcs.springbootjsp_iwa.model.Grade;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.repository.CourseRepository;
import pl.dmcs.springbootjsp_iwa.repository.GradeRepository;
import pl.dmcs.springbootjsp_iwa.repository.StudentRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/student")
public class StudentRESTController {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final GradeRepository gradeRepository;

    @Autowired
    public StudentRESTController(StudentRepository studentRepository, UserRepository userRepository, CourseRepository courseRepository, GradeRepository gradeRepository){
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.gradeRepository = gradeRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Student> findAllStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student findStudent(@PathVariable("id") long id){
        return studentRepository.findById(id);
    }

    @GetMapping("/byUsername/{username}")
    public Student findStudentByUserName(@PathVariable("username") String username){
        User user = userRepository.findByUsername(username).get();
        return studentRepository.findByUser(user);
    }

    @GetMapping("/grade/{code}/{username}")
    public List<Grade> findGrade(@PathVariable("username") String username, @PathVariable("code") String code){
        User user = userRepository.findByUsername(username).get();
        Student student = studentRepository.findByUser(user);
        return student.getGrades().stream().filter(g->g.getCourse().getCode().equals(code)).collect(Collectors.toList());
    }

    @PatchMapping("/addGrade/{code}/{id}")
    public ResponseEntity<?> addGrade(@RequestBody Grade grade, @PathVariable("id") long id, @PathVariable("code") String code) {
        Student student = studentRepository.findById(id);
        Course course = courseRepository.findByCode(code);
        grade.setCourse(course);
        student.getGrades().add(grade);
        studentRepository.save(student);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> deleteStudent(@PathVariable("id") long id){
        Student student = studentRepository.findById(id);
        if(student == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Course> courses = courseRepository.findCoursesByStudents(student);
        for (Course course : courses) {
            for (Student courseStudent : course.getStudents()) {
                if (courseStudent.getId() == student.getId()) {
                   course.getStudents().remove(courseStudent);
                   break;
                }
            }
        }
        courseRepository.saveAll(courses);
        studentRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/grade/{gradeId}/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> deleteGrade(@PathVariable("gradeId") long gradeId, @PathVariable("id") long id) {
        Student student = this.studentRepository.findById(id);
        Grade deleteGrade = this.gradeRepository.findById(gradeId);

        for(Grade grade : student.getGrades()) {
            if(grade.getId() == deleteGrade.getId()) {
                student.getGrades().remove(grade);
                break;
            }
        }

        this.gradeRepository.delete(deleteGrade);
        this.studentRepository.save(student);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
