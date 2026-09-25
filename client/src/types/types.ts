import Keycloak from 'keycloak-js';

export type User = {
  id: number;
  email: string;
  account: {
    id: number;
    firstName: string;
    lastName: string;
    reports: Report[];
  };
  roles: Role[];
};

export type Report = {
  id: number;
  dateTime: string;
  income: number;
  expenditure: number;
  dailyBalance: number;
  accWeekIncome: number;
  accWeekExp: number;
  accMonthIncome: number;
  accMonthExp: number;
};

type Role = {
  id: number;
  roleName: 'USER' | 'ADMIN';
};

export type CurrentBalanceType = {
  currentBalance: number;
  dailyPercentage: number;
  percentage: string;
};

export type FilteredReports = {
  daily?: Report;
  weekly: Report[];
  monthly: Report[];
  ytd: Report[];
};

export type AuthContextType = {
  keycloak: Keycloak | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: User | undefined;
  currentDate: Date | undefined;
  reports: FilteredReports | undefined;
};

export interface flattenReport {
  group: string;
  value: number;
}
