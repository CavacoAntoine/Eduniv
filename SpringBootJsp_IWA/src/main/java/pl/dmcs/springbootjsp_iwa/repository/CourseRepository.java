package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.Course;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.model.Teacher;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,String>{
    Course findByCode(String code);
    boolean existsByCode(String code);
    List<Course> findCoursesByTeacher(Teacher teacher);
    List<Course> findCoursesByStudents(Student student);
}
