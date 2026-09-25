package com.finapp.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_time")
    private LocalDate dateTime;

    private BigDecimal income;

    private BigDecimal expenditure;

    @Column(name = "net_balance")
    private BigDecimal dailyBalance = BigDecimal.ZERO;

    @Column(name = "acc_week_income")
    private BigDecimal accWeekIncome = BigDecimal.ZERO;

    @Column(name = "acc_week_exp")
    private BigDecimal accWeekExp = BigDecimal.ZERO;

    @Column(name = "acc_month_income")
    private BigDecimal accMonthIncome = BigDecimal.ZERO;

    @Column(name = "acc_month_exp")
    private BigDecimal accMonthExp = BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account account;

    // Constructors
    public Report() {}
    public Report(LocalDate dateTime, BigDecimal income, BigDecimal expenditure, BigDecimal accWeekIncome, BigDecimal accWeekExp, BigDecimal accMonthIncome, BigDecimal accMonthExp) {
        this.dateTime = dateTime;
        this.income = income;
        this.expenditure = expenditure;
        this.accWeekIncome = accWeekIncome;
        this.accWeekExp = accWeekExp;
        this.accMonthIncome = accMonthIncome;
        this.accMonthExp = accMonthExp;
    }

    // Methods
    public Long getId() {
        return id;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public BigDecimal getIncome() {
        return income;
    }
    public void setIncome(BigDecimal income) {
        this.income = income;
    }

    public BigDecimal getExpenditure() {
        return expenditure;
    }
    public void setExpenditure(BigDecimal expenditure) {
        this.expenditure = expenditure;
    }

    public BigDecimal getDailyBalance() {
        return dailyBalance;
    }
    public void setDailyBalance(BigDecimal netBalance) {
        this.dailyBalance = netBalance;
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

    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }


    // Overrides
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Report report = (Report) o;

        return id != null && id.equals(report.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Report{" +
                "id=" + id +
                ", dateTime=" + dateTime +
                ", income=" + income +
                ", expenditure=" + expenditure +
                ", dailyBalance=" + dailyBalance +
                ", account=" + (account != null ? account.getId() : null) +
                '}';
    }
}
