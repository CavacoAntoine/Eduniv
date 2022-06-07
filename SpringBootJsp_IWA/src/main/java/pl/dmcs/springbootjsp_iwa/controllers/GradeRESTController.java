package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Grade;
import pl.dmcs.springbootjsp_iwa.repository.GradeRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/grade")
public class GradeRESTController {
    private final GradeRepository gradeRepository;

    public GradeRESTController(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> updateGarde(@RequestBody Grade updateGrade, @PathVariable("id") long id) {
        Grade oldGrade = this.gradeRepository.findById(id);
        oldGrade.setGrade(updateGrade.getGrade());
        oldGrade.setDate(updateGrade.getDate());
        oldGrade.setDescription(updateGrade.getDescription());
        oldGrade.setTitle(updateGrade.getTitle());
        this.gradeRepository.save(oldGrade);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
