package com.example.banking.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name ="acount_transection")
public class TransectionHistory {
	
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private long id;
    @Column(name = "debit_userid")
	private long debitUserId;
    @Column(name = "credit_userid")
	private long creditUserId;
    @Column(name = "acount_userid")
	private long acountUserId;
    @Column(name = "acount_type")
	private String  acountType;
    @Column(name = "transfer_amount")
	private long transferAmount;
	@Builder.Default
    @Column(name = "transection_date")
	private LocalDateTime transectionDate = LocalDateTime.now(); 
    @Column(name = "deposite_by")
	private int depositBy;
    @Column(name = "deposite_medium")
	private String depositMedium;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getDebitUserId() {
		return debitUserId;
	}
	public void setDebitUserId(long debitUserId) {
		this.debitUserId = debitUserId;
	}
	public long getCreditUserId() {
		return creditUserId;
	}
	public void setCreditUserId(long creditUserId) {
		this.creditUserId = creditUserId;
	}
	public long getAcountUserId() {
		return acountUserId;
	}
	public void setAcountUserId(long acountUserId) {
		this.acountUserId = acountUserId;
	}
	public String getAcountType() {
		return acountType;
	}
	public void setAcountType(String acountType) {
		this.acountType = acountType;
	}
	public long getTransferAmount() {
		return transferAmount;
	}
	public void setTransferAmount(long transferAmount) {
		this.transferAmount = transferAmount;
	}
	public LocalDateTime getTransectionDate() {
		return transectionDate;
	}
	public void setTransectionDate(LocalDateTime transectionDate) {
		this.transectionDate = transectionDate;
	}
	public int getDepositBy() {
		return depositBy;
	}
	public void setDepositBy(int depositBy) {
		this.depositBy = depositBy;
	}
	public String getDepositMedium() {
		return depositMedium;
	}
	public void setDepositMedium(String depositMedium) {
		this.depositMedium = depositMedium;
	}
	public TransectionHistory(long id, long debitUserId, long creditUserId, long acountUserId, String acountType,
			long transferAmount, LocalDateTime transectionDate, int depositBy, String depositMedium) {
		super();
		this.id = id;
		this.debitUserId = debitUserId;
		this.creditUserId = creditUserId;
		this.acountUserId = acountUserId;
		this.acountType = acountType;
		this.transferAmount = transferAmount;
		this.transectionDate = transectionDate;
		this.depositBy = depositBy;
		this.depositMedium = depositMedium;
	}
	public TransectionHistory() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "TransectionHistory [id=" + id + ", debitUserId=" + debitUserId + ", creditUserId=" + creditUserId
				+ ", acountUserId=" + acountUserId + ", acountType=" + acountType + ", transferAmount=" + transferAmount
				+ ", transectionDate=" + transectionDate + ", depositBy=" + depositBy + ", depositMedium="
				+ depositMedium + "]";
	};
	
	

}
