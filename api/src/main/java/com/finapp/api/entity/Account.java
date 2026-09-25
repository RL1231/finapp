package com.finapp.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "accounts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnore
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private BigDecimal balance = BigDecimal.ZERO;

    @Column(name = "acc_week_income")
    private BigDecimal accWeekIncome = BigDecimal.ZERO;

    @Column(name = "acc_week_exp")
    private BigDecimal accWeekExp = BigDecimal.ZERO;

    @Column(name="acc_month_income")
    private BigDecimal accMonthIncome = BigDecimal.ZERO;

    @Column(name="acc_month_exp")
    private BigDecimal accMonthExp = BigDecimal.ZERO;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dateTime ASC")
    private Set<Report> reports = new HashSet<>();

    // Constructors
    public Account() {}
    public Account(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Methods
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
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

    public BigDecimal getBalance() {
        return balance;
    }
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getAccWeekIncome() {
        return accWeekIncome;
    }
    public void setAccWeekIncome(BigDecimal accWeekIncome) {
        this.accWeekIncome = accWeekIncome;
    }

    public BigDecimal getAccWeekExp() {
        return accWeekExp;
    }
    public void setAccWeekExp(BigDecimal accWeekExp) {
        this.accWeekExp = accWeekExp;
    }

    public BigDecimal getAccMonthIncome() {
        return accMonthIncome;
    }
    public void setAccMonthIncome(BigDecimal accMonthIncome) {
        this.accMonthIncome = accMonthIncome;
    }

    public BigDecimal getAccMonthExp() {
        return accMonthExp;
    }
    public void setAccMonthExp(BigDecimal accMonthExp) {
        this.accMonthExp = accMonthExp;
    }

    public Set<Report> getReports() {
        return reports;
    }
    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }

    // Helpers
    public void addReport(Report report) {
        if (this.reports == null || this.reports.contains(report))
            return;

        getReports().add(report);
        report.setAccount(this);
    }

    public void removeReport(Report report) {
        if (reports == null || !reports.contains(report))
            return;

        getReports().remove(report);
        report.setAccount(null);
    }

    // Overrides
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Account account = (Account) o;

        return id != null && id.equals(account.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", balance=" + balance +
                "}";
    }
}
