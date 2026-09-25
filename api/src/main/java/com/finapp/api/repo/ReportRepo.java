package com.finapp.api.repo;

import com.finapp.api.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepo extends JpaRepository<Account, Long> {
}
