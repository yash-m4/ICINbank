package com.example.banking.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.banking.models.CheckBookRequest;
import com.example.banking.models.Users;

@Repository
public interface UsersDao extends JpaRepository<Users, Long>{

	@Query(value = "select * from its_users where userName=:userName and password=:password",nativeQuery = true)
	Optional<Users> getUserDetails(String userName, String password);

	@Query(value = "SELECT u.userName, u.firstName, u.lastName, u.email, u.contactNo, u.primaryaccountNumber, u.savingaccountNumber FROM  its_users u",nativeQuery = true)
	List<Users> getAllUsers();

	@Query(value = "SELECT u.id, u.userName, r.acountType, r.description, r.status FROM checkbook_request r, its_users u WHERE u.id = r.userId AND r.status = 1", nativeQuery = true)
	List<Object> getckAllRequest();
    
	@Query(value = "select * from its_users u where u.role !=1",nativeQuery = true)
	List<Users> getallUsers();

	@Query(value = "select * from its_users where savingaccountNumber=:acountNo ",nativeQuery = true)
	Users findBySAcountNo(long acountNo);
	
	@Query(value = "select * from its_users where primaryaccountNumber=:acountNo ",nativeQuery = true)
	Users findByPAcountNo(long acountNo);

}
