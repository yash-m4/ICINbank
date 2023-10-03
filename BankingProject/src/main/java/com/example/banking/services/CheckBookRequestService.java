package com.example.banking.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.banking.Dao.CheckBookRequestDao;
import com.example.banking.Dao.TransectionHistoryDao;
import com.example.banking.Dao.UsersDao;
import com.example.banking.models.CheckBookRequest;
import com.example.banking.models.TransectionHistory;
import com.example.banking.models.Users;
import com.example.banking.servicesImpl.CheckBookRequestImpl;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class CheckBookRequestService implements CheckBookRequestImpl {

	@Autowired
	CheckBookRequestDao ckRequestDao;
	@Autowired
	TransectionHistoryDao tsdDao;

	@Autowired
	UsersDao userDao;
	HashMap<String, Object> hash = new HashMap<String, Object>();

	@Override
	public ResponseEntity<HashMap<String, Object>> createCheckBookRequest(CheckBookRequest ckRequest) {
		hash.clear();
		try {
			ckRequestDao.save(ckRequest);
			hash.put("status", HttpStatus.ACCEPTED);
			hash.put("message", "Check Book Request Created Succesfully !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);

		} catch (Exception e) {
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "Check Book Request Failed !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<HashMap<String, Object>> getckRequest() {
		hash.clear();
		try {
			List<Object> ckPending = ckRequestDao.getckAllRequest(1);
			List<Object> ckApproved = ckRequestDao.getckAllRequest(2);
			hash.put("status", HttpStatus.OK);
			hash.put("ckPending", ckPending);
			hash.put("ckApproved", ckApproved);
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "Exception Occur");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	public ResponseEntity<HashMap<String, Object>> getckRequest(long id) {
		try {
			Optional<CheckBookRequest> ck = ckRequestDao.findById(id);
			ck.get().setStatus(2);
			ckRequestDao.save(ck.get());
			hash.put("status", HttpStatus.ACCEPTED);
			hash.put("message", "Check Book Request Approved Succesfully !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "Check Book Request Failed !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	public ResponseEntity<HashMap<String, Object>> updateDepositeAmount(long debitId, long creditId, long amount,
			String amountType, int depositeBy, String depositMedium) {
		hash.clear();
		try {
			TransectionHistory ts = new TransectionHistory();
			ts.setAcountType(amountType);
			ts.setCreditUserId(creditId);
			ts.setAcountUserId(creditId);
			ts.setTransferAmount(amount);
			ts.setDebitUserId(debitId);
			ts.setDepositBy(1);
			ts.setDepositMedium(depositMedium);
			TransectionHistory tsSave = tsdDao.save(ts);
			if (tsSave != null) {
				Optional<Users> user = userDao.findById(tsSave.getCreditUserId());
				if (tsSave.getAcountType().equalsIgnoreCase("Primary")) {
					user.get().setPrimaryaccountBalance(
							user.get().getPrimaryaccountBalance() + tsSave.getTransferAmount());
				} else if (tsSave.getAcountType().equalsIgnoreCase("Saving")) {
					user.get()
							.setSavingaccountBalance(user.get().getSavingaccountBalance() + tsSave.getTransferAmount());
				}
				user.get().setUpdatedDate(LocalDateTime.now());
				userDao.save(user.get());
			}
			hash.put("status", HttpStatus.ACCEPTED);
			hash.put("message", "Amount Deposit Succesfully !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "An Exception occurred during the deposit. !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	public ResponseEntity<HashMap<String, Object>> getWithdrwalAmount(long debitId, long amount, String amountType) {
		hash.clear();
		try {
			TransectionHistory ts = new TransectionHistory();
			ts.setAcountType(amountType);
			ts.setDebitUserId(debitId);
			ts.setAcountUserId(debitId);
			ts.setTransferAmount(amount);
			ts.setDepositBy(1);
			TransectionHistory tsSave = tsdDao.save(ts);
			if (tsSave != null) {
				Optional<Users> user = userDao.findById(tsSave.getAcountUserId());
				if (tsSave.getAcountType().equalsIgnoreCase("Primary")) {
					user.get().setPrimaryaccountBalance(
							user.get().getPrimaryaccountBalance() - tsSave.getTransferAmount());
				} else if (tsSave.getAcountType().equalsIgnoreCase("Saving")) {
					user.get()
							.setSavingaccountBalance(user.get().getSavingaccountBalance() - tsSave.getTransferAmount());
				}
				user.get().setUpdatedDate(LocalDateTime.now());
				userDao.save(user.get());
			}
			hash.put("status", HttpStatus.ACCEPTED);
			hash.put("message", "Amount Withdrwal Succesfully !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("message", "An Exception occurred during the Withdrwal. !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	public ResponseEntity<HashMap<String, Object>> primaryAcDetails(long userId) {
		hash.clear();
		try {
			List<TransectionHistory> primaryTh = new ArrayList<>();
			List<TransectionHistory> savingTh = new ArrayList<>();
			List<TransectionHistory> pk = tsdDao.findAll();
			for (TransectionHistory th : pk) {
				if (th.getAcountUserId() == userId || th.getCreditUserId()==userId ||th.getDebitUserId()==userId) {
					if (th.getAcountType().equalsIgnoreCase("Primary")) {
						TransectionHistory t = new TransectionHistory();
						t.setTransectionDate(th.getTransectionDate());
						t.setTransferAmount(th.getTransferAmount());
						t.setDepositMedium(th.getDepositMedium());
						t.setDebitUserId(th.getDebitUserId());
						t.setCreditUserId(th.getCreditUserId());
						t.setAcountUserId(th.getAcountUserId());
						primaryTh.add(t);
					} else if (th.getAcountType().equalsIgnoreCase("Saving")) {
						TransectionHistory t = new TransectionHistory();
						t.setTransectionDate(th.getTransectionDate());
						t.setTransferAmount(th.getTransferAmount());
						t.setDepositMedium(th.getDepositMedium());
						t.setDebitUserId(th.getDebitUserId());
						t.setCreditUserId(th.getCreditUserId());
						t.setAcountUserId(th.getAcountUserId());
						savingTh.add(t);
					}
				}
			}
			// List<TransectionHistory> primaryCreditTh =
			// tsdDao.getPrimaryCAcDetails(userId);
			// List<TransectionHistory> primaryDebitTh =
			// tsdDao.getPrimaryDAcDetails(userId);
			// List<TransectionHistory> savingCreditTh = tsdDao.getSavingCAcDetails(userId);
			// List<TransectionHistory> savingDebitTh = tsdDao.getSavingDAcDetails(userId);
			hash.put("status", HttpStatus.ACCEPTED);
			hash.put("prTh", primaryTh);
			hash.put("sdTh", savingTh);
			return new ResponseEntity<>(hash, HttpStatus.OK);
		} catch (

		Exception e) {
			System.out.println(e);
			hash.put("status", HttpStatus.EXPECTATION_FAILED);
			hash.put("data", "An Exception occurred  !!");
			return new ResponseEntity<>(hash, HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<HashMap<String, Object>> saveUserTransection(long acountNo, int amount, long userId,
			String acType) {
		hash.clear();
		Optional<Users> debitUser = userDao.findById(userId);
		Users creditUer;
		if (acType.equalsIgnoreCase("Primary")) {
			if (debitUser.get().getPrimaryaccountBalance() > amount) {
				creditUer = userDao.findByPAcountNo(acountNo);
				TransectionHistory ts = new TransectionHistory();
				ts.setAcountType("Primary");
				ts.setDebitUserId(userId);
				ts.setCreditUserId(creditUer.getId());
				ts.setDepositBy(2);
				ts.setTransferAmount(amount);
				tsdDao.save(ts);
				debitUser.get().setPrimaryaccountBalance(debitUser.get().getPrimaryaccountBalance() - amount);
				userDao.save(debitUser.get());
				Optional<Users> creditSave = userDao.findById(creditUer.getId());
				creditSave.get().setPrimaryaccountBalance(creditSave.get().getPrimaryaccountBalance() + amount);
				userDao.save(creditSave.get());
				hash.put("status", HttpStatus.ACCEPTED);
				hash.put("message", "Amount Transfered Succesfully !!");
				return new ResponseEntity<>(hash, HttpStatus.OK);
			} else {
				hash.put("status", HttpStatus.EXPECTATION_FAILED);
				hash.put("data", "Insufficient Balance   !!");
				return new ResponseEntity<>(hash, HttpStatus.OK);
			}
		} else {
			if (debitUser.get().getPrimaryaccountBalance() > amount) {
				creditUer = userDao.findBySAcountNo(acountNo);
				TransectionHistory ts = new TransectionHistory();
				ts.setAcountType("Saving");
				ts.setDebitUserId(userId);
				ts.setCreditUserId(creditUer.getId());
				ts.setDepositBy(2);
				ts.setTransferAmount(amount);
				tsdDao.save(ts);
				debitUser.get().setSavingaccountBalance(debitUser.get().getSavingaccountBalance() - amount);
				userDao.save(debitUser.get());
				Optional<Users> creditSave = userDao.findById(creditUer.getId());
				creditSave.get().setSavingaccountBalance(creditSave.get().getSavingaccountBalance() + amount);
				userDao.save(creditSave.get());
				hash.put("status", HttpStatus.ACCEPTED);
				hash.put("message", "Amount Transfered Succesfully !!");
				return new ResponseEntity<>(hash, HttpStatus.OK);
			} else {
				hash.put("status", HttpStatus.EXPECTATION_FAILED);
				hash.put("data", "Insufficient Balance   !!");
				return new ResponseEntity<>(hash, HttpStatus.OK);
			}
		}
	}

	public ResponseEntity<HashMap<String, Object>> getuserAcbalance(long userId) {
		Optional<Users> user=userDao.findById(userId);
		hash.put("status", HttpStatus.ACCEPTED);
		hash.put("pAcB",user.get().getPrimaryaccountBalance() );
		hash.put("sAcB",user.get().getSavingaccountBalance() );
		hash.put("fName",user.get().getFirstName() );
		hash.put("lName",user.get().getLastName());
		hash.put("email",user.get().getEmail());
		hash.put("cNo",user.get().getContactNo() );
		hash.put("uName",user.get().getUserName() );
		hash.put("pAss",user.get().getPassword() );
		hash.put("pAc",user.get().getPrimaryaccountNumber() );
		hash.put("sAc",user.get().getSavingaccountNumber() );
		return new ResponseEntity<>(hash, HttpStatus.OK);
	}

}
