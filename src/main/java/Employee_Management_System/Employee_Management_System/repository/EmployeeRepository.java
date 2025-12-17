package Employee_Management_System.Employee_Management_System.repository;

import Employee_Management_System.Employee_Management_System.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Long> {
}
