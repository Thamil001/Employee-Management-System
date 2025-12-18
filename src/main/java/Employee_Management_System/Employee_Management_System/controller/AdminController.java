package Employee_Management_System.Employee_Management_System.controller;

import Employee_Management_System.Employee_Management_System.entity.AdminEntity;
import Employee_Management_System.Employee_Management_System.entity.EmployeeEntity;
import Employee_Management_System.Employee_Management_System.repository.AdminRepository;
import Employee_Management_System.Employee_Management_System.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    EmployeeRepository employeeRepository;


//    Admin Registration
    @PostMapping("/registration")
    public ResponseEntity<Void> adminRegistration(@RequestBody AdminEntity adminEntity) {

        if(adminEntity.getName().trim().isEmpty() || adminEntity.getPassword().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        adminRepository.save(adminEntity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


//    Admin Login
    @PostMapping("/login/{id}")
    public ResponseEntity<Void> adminLogin(@RequestBody AdminEntity adminEntity,@PathVariable Long id) {

        Optional<AdminEntity> checkIdExits = adminRepository.findById(id);

        if(checkIdExits.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        AdminEntity checkExitsName = checkIdExits.get();

        if(!checkExitsName.getName().equals(adminEntity.getName()) || !checkExitsName.getPassword().equals(adminEntity.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();

    }


//    Get All EmployeeData  on Admin
    @GetMapping("/getEmployeeData/")
    public ResponseEntity<List<EmployeeEntity>> EmployeeData() {

        return ResponseEntity.ok().body(employeeRepository.findAll());
    }


//    Get EmployeeData By id
    @PostMapping("/getEmployeeDataById/{id}")
    public ResponseEntity<EmployeeEntity> EmployeeDataById(@PathVariable Long id) {

        EmployeeEntity empData = employeeRepository.findById(id).get();

        if(empData.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().body(empData);

    }


//    Update Employee  status
    @PutMapping("/employeeStatus/{id}")
    public ResponseEntity<Void> EmployeeStatus(@PathVariable Long id) {
        EmployeeEntity empData = employeeRepository.findById(id).get();

        if(empData.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if(empData.isStatus()) {
            empData.setStatus(false);
            employeeRepository.save(empData);
            return ResponseEntity.status(HttpStatus.OK).build();
        }

        empData.setStatus(true);
        employeeRepository.save(empData);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


//    Update Employee Salary
    @PutMapping("/employee/salaryUpdate/{id}")
    public ResponseEntity<Void> EmployeeSalaryUpdate(@RequestBody EmployeeEntity employeeEntity,@PathVariable Long id) {

        System.out.println(employeeEntity.getSalary());
        EmployeeEntity empData = employeeRepository.findById(id).get();

        if(empData.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        empData.setSalary(employeeEntity.getSalary());
        empData.setPaid(true);
        employeeRepository.save(empData);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
