package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.springbootjsp_iwa.repository.AdminRepository;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/admin")
public class AdminRESTController {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminRESTController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
}
