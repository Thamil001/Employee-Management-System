package Employee_Management_System.Employee_Management_System.controller;

import Employee_Management_System.Employee_Management_System.entity.EmployeeEntity;
import Employee_Management_System.Employee_Management_System.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeRepository employeeRepository;

//    Employee Login
    @PostMapping("/login")
    public ResponseEntity<Void> employeeLogin(@RequestBody EmployeeEntity employeeEntity) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findById(employeeEntity.getId());

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity checkExits = checkExitsEmployee.get();

        if(!checkExits.getName().equals(employeeEntity.getName())) {
            System.out.println("Error"+checkExits.getName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    Employee Get Data by id
    @PostMapping("/data")
    public ResponseEntity<List<EmployeeEntity>> employeeData(@RequestBody EmployeeEntity employeeEntity) {

        Optional<EmployeeEntity> checkExitsEmployee = employeeRepository.findById(employeeEntity.getId());

        if(checkExitsEmployee.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        EmployeeEntity empData = employeeRepository.findById(employeeEntity.getId()).get();

        if (empData.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(
                List.of(employeeRepository.findById(employeeEntity.getId()).get())
        );
    }


}
