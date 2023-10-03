package com.example.banking.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.banking.models.CheckBookRequest;

@Repository
public interface CheckBookRequestDao extends JpaRepository<CheckBookRequest, Long> {

	@Query(value = "SELECT u.id, u.userName, r.acountType, r.description, r.status,r.id FROM checkbook_request r, its_users u WHERE u.id = r.userId AND r.status = :status", nativeQuery = true)
	List<Object> getckAllRequest( int status);

}
