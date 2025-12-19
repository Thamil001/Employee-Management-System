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

//    Employee Login
    @PostMapping("/login/{id}")
    public ResponseEntity<Void> employeeLogin(@RequestBody EmployeeEntity employeeEntity, @PathVariable Long id) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findById(id);

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity checkExits = checkExitsEmployee.get();

        if(!checkExits.getName().equals(employeeEntity.getName())
         || !checkExits.getContact().equals(employeeEntity.getContact())) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    Employee Get Data by id
    @GetMapping("/data/{id}")
    public ResponseEntity<EmployeeEntity> employeeData(@PathVariable Long id) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findById(id);

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity empData = employeeRepository.findById(id).get();

        if (empData.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().body(empData);
    }

//    Getting Employee Own id
    @PostMapping("/getId")
    public ResponseEntity<Long> getId(@RequestBody EmployeeEntity employeeEntity) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findByName(employeeEntity.getName());

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity checkExitsContact = checkExitsEmployee.get();

        if(!checkExitsContact.getContact().equals(employeeEntity.getContact())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok().body(checkExitsContact.getId());
    }

}
