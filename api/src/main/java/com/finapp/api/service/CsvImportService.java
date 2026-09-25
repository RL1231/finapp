package com.finapp.api.service;

import com.finapp.api.entity.*;
import com.finapp.api.repo.AccountRepo;
import com.finapp.api.repo.RoleRepo;
import com.finapp.api.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

@Service
public class CsvImportService {
    private final AccountRepo accountRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;

    public CsvImportService(AccountRepo accountRepo, RoleRepo roleRepo, UserRepo userRepo) {
        this.accountRepo = accountRepo;
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public void importCsv() {
        Map<RoleName, Role> roleCache = new EnumMap<>(RoleName.class);
        roleRepo.findAll().forEach(role -> roleCache.put(role.getRoleName(), role));

        Set<String> importedEmails = new HashSet<>();
        Resource[] resources = loadDataResource();
        Arrays.sort(resources, Comparator.comparing(Resource::getFilename, Comparator.nullsLast(String::compareTo)));

        for (Resource resource : resources) {
            importOneFile(resource, roleCache, importedEmails);
        }
    }

    private Resource[] loadDataResource() {
        try {
            return new org.springframework.core.io.support.PathMatchingResourcePatternResolver()
                    .getResources("classpath:data/*.csv");
        } catch (Exception e) {
            throw new IllegalStateException("Failed to locate CSV files in classpath:data", e);
        }
    }

    private void importOneFile(Resource resource, Map<RoleName, Role> roleCache, Set<String> importedEmails) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            boolean isFirstLine = true;
            CsvRow firstRow = null;
            User user = null;
            Account account = null;

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                if (line.isBlank()) {
                    continue;
                }

                String[] parts = splitCsvLine(line);
                if (parts.length < 8) {
                    continue;
                }

                CsvRow row = parseRow(parts);
                if (firstRow == null) {
                    firstRow = row;
                    String email = firstRow.email();
                    if (importedEmails.contains(email) || userRepo.findByEmail(email).isPresent()) {
                        return;
                    }
                    importedEmails.add(email);

                    user = new User(email);
                    Role role = resolveRole(firstRow.roleName(), roleCache);
                    account = new Account(firstRow.firstName(), firstRow.lastName());
                    account.setBalance(BigDecimal.valueOf(5000));
                    user.addRole(role);
                    user.setAccount(account);
                }

                updateAccount(account, row);
            }

            if (user != null) {
                userRepo.save(user);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to read CSV file: " + resource.getFilename(), e);
        }
    }

    private void updateAccount(Account account, CsvRow row) {
        BigDecimal income = row.income();
        BigDecimal expenditures = row.expenditures();

        if (row.reportDate().getDayOfWeek() == DayOfWeek.MONDAY) {
            account.setAccWeekIncome(BigDecimal.ZERO);
            account.setAccWeekExp(BigDecimal.ZERO);
        }

        BigDecimal weekIncome = account.getAccWeekIncome().add(income);
        BigDecimal weekExp = account.getAccWeekExp().add(expenditures);
        account.setAccWeekIncome(weekIncome);
        account.setAccWeekExp(weekExp);

        if (row.reportDate().getDayOfMonth() == 1) {
            account.setAccMonthIncome(BigDecimal.ZERO);
            account.setAccMonthExp(BigDecimal.ZERO);
        }

        BigDecimal monthIncome = account.getAccMonthIncome().add(income);
        BigDecimal monthExp = account.getAccMonthExp().add(expenditures);
        account.setAccMonthIncome(monthIncome);
        account.setAccMonthExp(monthExp);

        BigDecimal netBalance = account.getBalance().add(income.subtract(expenditures));
        Report report = new Report(
                row.reportDate(),
                income,
                expenditures,
                weekIncome,
                weekExp,
                monthIncome,
                monthExp
        );
        report.setDailyBalance(netBalance);
        account.setBalance(netBalance);
        account.addReport(report);
    }

    private String[] splitCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);
            if (ch == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    current.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch == ',' && !inQuotes) {
                fields.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }

        fields.add(current.toString());
        return fields.toArray(String[]::new);
    }

    private CsvRow parseRow(String[] parts) {
        return new CsvRow(
                parts[0].trim(),
                parts[1].trim(),
                parts[3].trim(),
                RoleName.valueOf(parts[4].trim().toUpperCase(Locale.ROOT)),
                LocalDate.parse(parts[5].trim()),
                new BigDecimal(parts[6].trim()),
                new BigDecimal(parts[7].trim())
        );
    }

    private Role resolveRole(RoleName roleName, Map<RoleName, Role> roleCache) {
        return roleCache.computeIfAbsent(roleName, rn -> {
            Role newRole = new Role(rn);
            roleRepo.save(newRole);
            return newRole;
        });
    }

    private record CsvRow(
        String firstName,
        String lastName,
        String email,
        RoleName roleName,
        LocalDate reportDate,
        BigDecimal income,
        BigDecimal expenditures
    ) {}
}