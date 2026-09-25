import { Link } from 'react-router';
import MobileNav from '../MobileNav';
import QuickActions from '../QuickActions';
import { useAuth } from '../../hooks/useAuth';
import { currentDailyBalance } from '../../utilities/currentDailyBalance';
import { formatUSD } from '../../utilities/formatCurrency';

const summaryStyle = `flex flex-col gap-y-4 border-1 border-[#c3b1e1] rounded-xl p-4 sm:p-6 lg:landscape:px-10 text-white text-sm sm:text-base font-semibold`;

export default function WalletPage() {
  const { userData, reports } = useAuth();
  if (!userData) {
    console.log('Failed to load userData');
    return;
  }

  const dailyResults = currentDailyBalance(userData, reports);

  return (
    <div className="mt-18 landscape:mb-30 lg:landscape:mt-12 text-white">
      <div className="flex flex-2 items-center mb-4 text-xl sm:text-2xl font-semibold">
        <Link to="/">&#60; Wallet</Link>
      </div>
      <div
        className={`flex flex-col justify-center items-center mb-4 sm:mb-6 p-4 sm:py-6 rounded-xl bg-linear-to-r from-purple-400 via-indigo-500 to-indigo-600`}
      >
        <span className="text-sm sm:text-base italic">Daily Balance</span>
        <span className="text-2xl sm:text-3xl font-semibold">
          {formatUSD(dailyResults.currentBalance)}
        </span>
      </div>
      <div className={`flex flex-col mb-4 sm:mb-6`}>
        <span className="mb-4 text-xl sm:text-2xl text-white font-semibold">Current Activity</span>
        <div className={`${summaryStyle}`}>
          <div className="flex flex-2">
            <span className="text-base">Growth</span>
            <span className="ml-auto">
              {dailyResults.dailyPercentage < 0
                ? `-${dailyResults.percentage}%`
                : `${dailyResults.percentage}%`}
            </span>
          </div>
          <div className="flex flex-2">
            <span>Income</span>
            <span
              className={`ml-auto ${reports?.daily && reports.daily.income > 0 ? 'text-[#90fda9]' : 'text-white'}`}
            >
              {reports?.daily ? formatUSD(reports.daily.income) : 'No Data'}
            </span>
          </div>
          <div className="flex flex-2">
            <span>Expenditures</span>
            <span className="ml-auto text-[#ff6384]">
              {reports?.daily ? formatUSD(reports.daily.expenditure) : 'No Data'}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4 sm:mb-6">
        <span className="text-xl sm:text-2xl text-white font-semibold">Financial Reports</span>
        <QuickActions />
      </div>
      <MobileNav />
    </div>
  );
}
