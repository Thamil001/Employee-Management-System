package Employee_Management_System.Employee_Management_System.repository;

import Employee_Management_System.Employee_Management_System.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
}
