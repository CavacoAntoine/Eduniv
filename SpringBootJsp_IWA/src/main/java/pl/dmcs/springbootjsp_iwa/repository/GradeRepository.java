package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.springbootjsp_iwa.model.Course;
import pl.dmcs.springbootjsp_iwa.model.Grade;

import java.util.List;


public interface GradeRepository extends JpaRepository<Grade, Long> {
    Grade findById(long id);
    List<Grade> findByCourse(Course course);
}
