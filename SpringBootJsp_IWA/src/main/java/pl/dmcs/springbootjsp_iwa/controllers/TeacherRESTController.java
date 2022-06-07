package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.message.response.ResponseMessage;
import pl.dmcs.springbootjsp_iwa.model.Course;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.model.Teacher;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.repository.CourseRepository;
import pl.dmcs.springbootjsp_iwa.repository.TeacherRepository;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/teacher")
public class TeacherRESTController {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public TeacherRESTController(TeacherRepository teacherRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Teacher> teacherList() {
        return teacherRepository.findAll();
    }

    @GetMapping("/{id}")
    public Teacher findTeacher(@PathVariable("id") long id){
        return teacherRepository.findById(id);
    }

    @GetMapping("/byUsername/{username}")
    public Teacher findTeacherByUserName(@PathVariable("username") String username){
        User user = userRepository.findByUsername(username).get();
        return teacherRepository.findByUser(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTeacher(@PathVariable("id") long id){
        Teacher teacher = teacherRepository.findById(id);
        if(teacher == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Course> courses = courseRepository.findCoursesByTeacher(teacher);
        if(courses.size() > 0){
            return new ResponseEntity<>(new ResponseMessage("Fail -> This teacher has courses."), HttpStatus.BAD_REQUEST);
        }
        courseRepository.saveAll(courses);
        teacherRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
