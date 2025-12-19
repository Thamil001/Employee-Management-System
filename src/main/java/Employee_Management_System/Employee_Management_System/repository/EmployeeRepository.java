package Employee_Management_System.Employee_Management_System.repository;

import Employee_Management_System.Employee_Management_System.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Long> {
    Optional<EmployeeEntity> findByName(String name);
    boolean existsById(Long id);
    Optional<EmployeeEntity> findByContact(String contact);
}

