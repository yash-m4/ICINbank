package com.example.banking.servicesImpl;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;

import com.example.banking.models.Users;


public interface UsersServiceImpl {

	ResponseEntity<HashMap<String, Object>> authLogin(String userName, String password);

	ResponseEntity<HashMap<String, Object>> getAllUsers();

	ResponseEntity<HashMap<String, Object>> updateUser(long id, String userName, String firstName, String lastName,
			long contactNo, String email, int status, int fnStatus);

	ResponseEntity<HashMap<String, Object>> registerUser(Users user);

}
