package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.Teacher;
import pl.dmcs.springbootjsp_iwa.model.User;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findAll();
    Teacher findById(long id);
    Teacher findByUser(User user);
    boolean existsById(long id);
}
