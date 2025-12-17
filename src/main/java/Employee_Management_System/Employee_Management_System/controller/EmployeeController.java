package Employee_Management_System.Employee_Management_System.controller;

import Employee_Management_System.Employee_Management_System.entity.EmployeeEntity;
import Employee_Management_System.Employee_Management_System.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeRepository employeeRepository;

//    Employee Registration
    @PostMapping("/employeeRegistration")
    public ResponseEntity<Void> employeeRegistration(@RequestBody EmployeeEntity employeeEntity) {

        if(employeeEntity.getName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        employeeRepository.save(employeeEntity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    Employee Login
    @PostMapping("/employeeLogin/{id}")
    public ResponseEntity<Void> employeeLogin(@RequestBody EmployeeEntity employeeEntity, @PathVariable Long id) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findById(id);

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity checkExitsName = checkExitsEmployee.get();

        if(!checkExitsName.getName().equals(employeeEntity.getName())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

//    Employee Get Data by id
    @GetMapping("/employeeData/{id}")
    public ResponseEntity<EmployeeEntity> employeeData(@PathVariable Long id) {

        return ResponseEntity.ok().body(employeeRepository.findById(id).get());
    }

}
