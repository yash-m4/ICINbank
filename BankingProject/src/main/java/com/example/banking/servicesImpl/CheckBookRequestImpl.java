package com.example.banking.servicesImpl;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;

import com.example.banking.models.CheckBookRequest;

public interface CheckBookRequestImpl {

	ResponseEntity<HashMap<String, Object>> createCheckBookRequest(CheckBookRequest ckRequest);

	ResponseEntity<HashMap<String, Object>> getckRequest();


	ResponseEntity<HashMap<String, Object>> saveUserTransection(long acountNo, int amount, long userId, String acType);

}
