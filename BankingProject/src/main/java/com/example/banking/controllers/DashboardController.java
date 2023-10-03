package com.example.banking.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.models.CheckBookRequest;
import com.example.banking.services.CheckBookRequestService;
import com.example.banking.services.UsersService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/dash")
@CrossOrigin("*")
public class DashboardController {

	@Autowired
	UsersService usersService;

	@Autowired
	CheckBookRequestService checkBookRequest;

	HashMap<String, Object> hash = new HashMap<>();

	@GetMapping("/userAcount")
	public ResponseEntity<HashMap<String, Object>> getAllUsers(HttpServletRequest request) {
		return usersService.getAllUsers();
	}

	@GetMapping("/updateUser")
	public ResponseEntity<HashMap<String, Object>> updateUser(HttpServletRequest request, @RequestParam long id,
			@RequestParam String userName, @RequestParam String firstName, @RequestParam String lastName,
			@RequestParam String email, @RequestParam long contactNo, @RequestParam int status,int fnStatus) {
		return usersService.updateUser(id, userName, firstName, lastName, contactNo, email, status,fnStatus);
	}

	@PostMapping("/createCBRequest")
	public ResponseEntity<HashMap<String, Object>> updateUser(HttpServletRequest request,
			@RequestBody CheckBookRequest ckRequest) {
		return checkBookRequest.createCheckBookRequest(ckRequest);
	}

	@GetMapping("/getckRequest")
	public ResponseEntity<HashMap<String, Object>> getckAllRequest(HttpServletRequest request) {
		return checkBookRequest.getckRequest();
	}

	@PostMapping("/approveReq")
	public ResponseEntity<HashMap<String, Object>> approvependingReq(HttpServletRequest request,
			@RequestParam long Id) {
		return checkBookRequest.getckRequest(Id);
	}

	@PostMapping("/depostAmount")
	public ResponseEntity<HashMap<String, Object>> depostAmount(HttpServletRequest request, @RequestParam long debitId,
			@RequestParam long creditId, @RequestParam long amount, @RequestParam String amountType,
			@RequestParam int depositeBy,@RequestParam String depositeMedium) {
		return checkBookRequest.updateDepositeAmount(debitId, creditId, amount, amountType, depositeBy,depositeMedium);
	}
	
	@PostMapping("/withdrawalAmount")
	public ResponseEntity<HashMap<String, Object>> depostAmount(HttpServletRequest request, @RequestParam long debitId,
			 @RequestParam long amount, @RequestParam String amountType) {
		return checkBookRequest.getWithdrwalAmount(debitId, amount, amountType);
	}
	
	@PostMapping("/allAcTrans")
	public ResponseEntity<HashMap<String, Object>> depostAmount(HttpServletRequest request,@RequestParam long userId) {
		return checkBookRequest.primaryAcDetails(userId);
	}
	
	@PostMapping("/userTransection")
	public ResponseEntity<HashMap<String, Object>> userTransection(HttpServletRequest request,@RequestParam long acountNo,@RequestParam int amount,@RequestParam long userId,@RequestParam String acountType) {
		return checkBookRequest.saveUserTransection(acountNo,amount,userId, acountType);
	}
	
	@PostMapping("/getuserAcbalance")
	public ResponseEntity<HashMap<String, Object>> getuserAcbalance(HttpServletRequest request,@RequestParam long userId) {
		return checkBookRequest.getuserAcbalance(userId);
	}
}
