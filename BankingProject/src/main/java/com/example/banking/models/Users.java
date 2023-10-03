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
@Table(name ="its_users")
public class Users {
	
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private long contactNo;
	private String userName;
	private String password;
	private long primaryaccountNumber;
	private long primaryaccountBalance;
	private long savingaccountNumber;
	private long savingaccountBalance;
	private int status;
	@Column(columnDefinition = "int default 0")
	private int functionAccess;
	private int role;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getContactNo() {
		return contactNo;
	}
	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getPrimaryaccountNumber() {
		return primaryaccountNumber;
	}
	public void setPrimaryaccountNumber(long primaryaccountNumber) {
		this.primaryaccountNumber = primaryaccountNumber;
	}
	public long getPrimaryaccountBalance() {
		return primaryaccountBalance;
	}
	public void setPrimaryaccountBalance(long primaryaccountBalance) {
		this.primaryaccountBalance = primaryaccountBalance;
	}
	public long getSavingaccountNumber() {
		return savingaccountNumber;
	}
	public void setSavingaccountNumber(long savingaccountNumber) {
		this.savingaccountNumber = savingaccountNumber;
	}
	public long getSavingaccountBalance() {
		return savingaccountBalance;
	}
	public void setSavingaccountBalance(long savingaccountBalance) {
		this.savingaccountBalance = savingaccountBalance;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getFunctionAccess() {
		return functionAccess;
	}
	public void setFunctionAccess(int functionAccess) {
		this.functionAccess = functionAccess;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public LocalDateTime getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	public LocalDateTime getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}
	public Users(Long id, String firstName, String lastName, String email, long contactNo, String userName,
			String password, long primaryaccountNumber, long primaryaccountBalance, long savingaccountNumber,
			long savingaccountBalance, int status, int functionAccess, int role, LocalDateTime createdDate,
			LocalDateTime updatedDate) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNo = contactNo;
		this.userName = userName;
		this.password = password;
		this.primaryaccountNumber = primaryaccountNumber;
		this.primaryaccountBalance = primaryaccountBalance;
		this.savingaccountNumber = savingaccountNumber;
		this.savingaccountBalance = savingaccountBalance;
		this.status = status;
		this.functionAccess = functionAccess;
		this.role = role;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
	}
	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Users [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", contactNo=" + contactNo + ", userName=" + userName + ", password=" + password
				+ ", primaryaccountNumber=" + primaryaccountNumber + ", primaryaccountBalance=" + primaryaccountBalance
				+ ", savingaccountNumber=" + savingaccountNumber + ", savingaccountBalance=" + savingaccountBalance
				+ ", status=" + status + ", functionAccess=" + functionAccess + ", role=" + role + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + "]";
	}
	

	
}
