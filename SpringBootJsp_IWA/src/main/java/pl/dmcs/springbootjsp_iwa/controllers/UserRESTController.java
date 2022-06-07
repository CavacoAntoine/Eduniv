package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.User;
import pl.dmcs.springbootjsp_iwa.repository.UserRepository;

import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/user")
public class UserRESTController {

    private final UserRepository userRepository;

    @Autowired
    public UserRESTController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public User findUser(@PathVariable("id") String id){
        return userRepository.findByUsername(id).orElseThrow(() ->new UsernameNotFoundException("User Not Found with -> email: " + id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        User updateUser = userRepository.findById(id);
        updateUser.setFirstname((String)updates.get("firstname"));
        updateUser.setLastname((String)updates.get("lastname"));
        updateUser.setPhone((String)updates.get("phone"));
        userRepository.save(updateUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
