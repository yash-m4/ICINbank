package com.example.banking.services;

import java.util.HashMap;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.banking.Dao.UsersDao;
import com.example.banking.config.UniqueNumberGenerator;
import com.example.banking.models.Users;
import com.example.banking.servicesImpl.UsersServiceImpl;

@Service
public class UsersService implements UsersServiceImpl {

	@Autowired
	UsersDao usersDao;
	HashMap<String, Object> hash = new HashMap<>();

	@Override
	public ResponseEntity<HashMap<String, Object>> authLogin(String userName, String password) {
		// TODO Auto-generated method stub
		Optional<Users> user = usersDao.getUserDetails(userName, password);
		hash.clear();
		if (user.isPresent()) {
			if (user.get().getStatus() == 1) {
				hash.put("status", HttpStatus.OK);
				hash.put("message", "");
				hash.put("data", user);
				return new ResponseEntity<>(hash, HttpStatus.OK);
			} else {
				hash.put("status", HttpStatus.NOT_ACCEPTABLE);
				hash.put("message", "Access Denied Please Contact Admin");
				return new ResponseEntity<>(hash, HttpStatus.NOT_ACCEPTABLE);
			}
		} else {
			hash.put("status", HttpStatus.NOT_FOUND);
			hash.put("data", "User Not Found ");
			hash.put("message", "User Not Found ");
			return new ResponseEntity<>(hash, HttpStatus.NOT_FOUND);

		}
	}

	@Override
	public ResponseEntity<HashMap<String, Object>> registerUser(Users user) {
		hash.clear();
		if (user != null) {
			Long succesId = usersDao.save(user).getId();
			if (succesId > 0) {
				Optional<Users> userSave = usersDao.findById(succesId);
				long[] uniqueNumbers = UniqueNumberGenerator.generateUniqueNumber(String.valueOf(succesId));
				userSave.get().setPrimaryaccountNumber(uniqueNumbers[0]);
				userSave.get().setSavingaccountNumber(uniqueNumbers[1]);
				usersDao.save(userSave.get());
				hash.put("status", HttpStatus.OK);
				hash.put("data", succesId);
				return new ResponseEntity<>(hash, HttpStatus.OK);
			} else {
				hash.put("status", HttpStatus.EXPECTATION_FAILED);
				hash.put("message", "user Not Created");
				return new ResponseEntity<>(hash, HttpStatus.EXPECTATION_FAILED);
			}

		} else {
			hash.put("status", HttpStatus.NOT_ACCEPTABLE);
			hash.put("message", "user Not Created");
			return new ResponseEntity<>(hash, HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@Override
	public ResponseEntity<HashMap<String, Object>> getAllUsers() {
		hash.clear();
		try {
			// List<Users> users = usersDao.getAllUsers();
			List<Users> users = usersDao.getallUsers();
			hash.put("status", HttpStatus.OK);
			hash.put("data", users);
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("data", "Exception occur please check");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<HashMap<String, Object>> updateUser(long id, String userName, String firstName,
			String lastName, long contactNo, String email, int status, int fnStatus) {
		hash.clear();
		try {
			Optional<Users> user = usersDao.findById(id);
			user.get().setUserName(userName);
			user.get().setFirstName(firstName);
			user.get().setLastName(lastName);
			user.get().setEmail(email);
			user.get().setContactNo(contactNo);
			user.get().setStatus(status);
			user.get().setFunctionAccess(fnStatus);
			usersDao.save(user.get());
			hash.put("status", HttpStatus.OK);
			hash.put("message", "user   " + userName + "  Updated Succesfully");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "Exception occur User Update Failed Please Check");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

}
