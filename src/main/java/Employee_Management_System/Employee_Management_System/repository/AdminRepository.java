package Employee_Management_System.Employee_Management_System.repository;

import Employee_Management_System.Employee_Management_System.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
    boolean existsById(Long id);
}
