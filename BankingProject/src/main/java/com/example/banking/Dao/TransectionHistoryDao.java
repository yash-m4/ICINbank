package com.example.banking.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.banking.models.TransectionHistory;

@Repository
public interface TransectionHistoryDao extends JpaRepository<TransectionHistory, Long>{

	@Query(value = "SELECT * FROM acount_transection th where  and th.acount_userid=:userId order by th.transection_date desc",nativeQuery = true)
	List<TransectionHistory> getPrimaryCAcDetails(long userId);

	@Query(value = "select transectionDate,transferAmount,depositMedium,acountUserId from acount_transection where acountType='Primary' and creditUserId=0 and acountUserId=:userId order by transectionDate desc",nativeQuery = true)
	List<TransectionHistory> getPrimaryDAcDetails(long userId);

	@Query(value = "select transectionDate,transferAmount,depositMedium,debitUserId,creditUserId from acount_transection where acountType='Saving'  and acountUserId=:userId order by transectionDate desc",nativeQuery = true)
	List<TransectionHistory> getSavingCAcDetails(long userId);

	@Query(value = "select transectionDate,transferAmount,depositMedium,acountUserId from acount_transection where acountType='Saving' and creditUserId=0 and acountUserId=:userId order by transectionDate desc",nativeQuery = true)
	List<TransectionHistory> getSavingDAcDetails(long userId);

}
