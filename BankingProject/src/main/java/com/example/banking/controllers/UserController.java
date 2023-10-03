package com.example.banking.controllers;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.models.Users;
import com.example.banking.services.UsersService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	
	@Autowired
	UsersService usersService;
	
	HashMap<String, Object> hash = new HashMap<>();
	
	@GetMapping("/login")
	public ResponseEntity<HashMap<String, Object>> getLoginuser(HttpServletRequest request,@RequestParam String userName,@RequestParam String password){
		return usersService.authLogin(userName,password);
	}
	
	@PostMapping("/registerUser")
	public ResponseEntity<HashMap<String, Object>> resgisteruser(HttpServletRequest request,@RequestBody Users user){
		return usersService.registerUser(user);
	}
	
	

}
