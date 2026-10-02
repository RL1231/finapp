import { formatUSD } from '../utilities/formatCurrency';
import { average } from '../utilities/math';

type DailyData = {
  label: string;
  value: number;
};

type WeekData = {
  label: string;
  date: string;
  value: number;
};

type MonthData = {
  label: string;
  values: number[];
};

type YearData = {
  date: string;
  balance: number;
  income: number;
  expenditures: number;
};

interface SummaryProps {
  dailyData?: DailyData[];
  weekData?: WeekData[];
  monthData?: MonthData[];
  yearData?: YearData[];
}

const summary = {
  container: 'flex flex-col mb-3 sm:mb-8',
  title: 'mb-2 sm:mb-4 lg:mx-auto text-sm sm:text-2xl font-semibold',
  card: `flex flex-col gap-y-4 lg:mt-8 border-1 border-[#c3b1e1] rounded-xl p-4 sm:px-6 text-sm sm:text-xl font-semibold`,
};

export default function Summary({ dailyData, weekData, monthData, yearData }: SummaryProps) {
  if (dailyData && dailyData?.length > 0) {
    const balance = dailyData?.filter((d) => d.label === 'balance').find((d) => d.value)?.value;
    const income = dailyData?.filter((d) => d.label === 'income').find((d) => d.value)?.value;
    const exp = dailyData?.filter((d) => d.label === 'expenditure').find((d) => d.value)?.value;

    return (
      <div className={summary.container}>
        <span className={summary.title}>Daily Report</span>
        <div className={summary.card}>
          <div className="flex flex-2">
            <span>Balance</span>
            <span className="ml-auto">{formatUSD(balance || 0)}</span>
          </div>
          <div className="flex flex-2">
            <span>Income</span>
            <span className="ml-auto">{formatUSD(income || 0)}</span>
          </div>
          <div className="flex flex-2">
            <span>Expenditures</span>
            <span className="ml-auto">{formatUSD(exp || 0)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (weekData && weekData?.length > 0) {
    const balances = weekData.filter((d) => d.label === 'balance').map((d) => d.value);
    const incomes = weekData.filter((d) => d.label === 'income').map((d) => d.value);
    const expenditures = weekData.filter((d) => d.label === 'expenditures').map((d) => d.value);

    return (
      <div className={summary.container}>
        <span className={summary.title}>Weekly Average</span>
        <div className={summary.card}>
          <div className="flex flex-2">
            <span>Balance</span>
            <span className="ml-auto">{formatUSD(average(balances))}</span>
          </div>
          <div className="flex flex-2">
            <span>Income</span>
            <span className="ml-auto">{formatUSD(average(incomes))}</span>
          </div>
          <div className="flex flex-2">
            <span>Expenditures</span>
            <span className="ml-auto">{formatUSD(average(expenditures))}</span>
          </div>
        </div>
      </div>
    );
  }

  if (monthData && monthData?.length > 0) {
    const balances = monthData.filter((d) => d.label === 'balance').flatMap((d) => d.values);
    const incomes = monthData.filter((d) => d.label === 'income').flatMap((d) => d.values);
    const expenditures = monthData
      .filter((d) => d.label === 'expenditures')
      .flatMap((d) => d.values);

    return (
      <div className={summary.container}>
        <span className={summary.title}>Monthly Average</span>
        <div className={summary.card}>
          <div className="flex flex-2">
            <span>Balance</span>
            <span className="ml-auto">{formatUSD(average(balances))}</span>
          </div>
          <div className="flex flex-2">
            <span>Income</span>
            <span className="ml-auto">{formatUSD(average(incomes))}</span>
          </div>
          <div className="flex flex-2">
            <span>Expenditures</span>
            <span className="ml-auto">{formatUSD(average(expenditures))}</span>
          </div>
        </div>
      </div>
    );
  }

  if (yearData && yearData?.length > 0) {
    const balances = yearData.map((d) => d.balance);
    const incomes = yearData.map((d) => d.income);
    const exp = yearData.map((d) => d.expenditures);

    return (
      <div className={summary.container}>
        <span className={summary.title}>YTD Average</span>
        <div className={summary.card}>
          <div className="flex flex-2">
            <span>Balance</span>
            <span className="ml-auto">{formatUSD(average(balances))}</span>
          </div>
          <div className="flex flex-2">
            <span>Income</span>
            <span className="ml-auto">{formatUSD(average(incomes))}</span>
          </div>
          <div className="flex flex-2">
            <span>Expenditures</span>
            <span className="ml-auto">{formatUSD(average(exp))}</span>
          </div>
        </div>
      </div>
    );
  }

  return <div className={summary.card}>No Data</div>;
}
