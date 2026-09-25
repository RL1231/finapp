import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { formatUSD } from '../utilities/formatCurrency';
import { currentDailyBalance } from '../utilities/currentDailyBalance';

export default function CurrentBalance() {
  const { userData, reports } = useAuth();

  if (!userData) {
    console.log('Failed to load userData');
    return;
  }
  const dailyResults = currentDailyBalance(userData, reports);

  const currentPath = window.location.pathname;

  return (
    <div
      className={`mb-4 ${currentPath === '/' ? 'flex flex-col justify-center sm:mb-6 p-5 sm:p-7 md:p-7 rounded-2xl' : 'px-6 py-2 min-h-13 rounded-lg'} bg-linear-to-r from-purple-400 via-indigo-500 to-indigo-600`}
    >
      <div
        className={`flex w-full md:mb-1 lg:mb-0 ${currentPath !== '/' ? 'justify-center items-center' : ''}`}
      >
        {dailyResults && dailyResults.dailyPercentage > 0 ? (
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L9.00001 4L11.2929 6.29289L8.50001 9.08579L5.50001 6.08579L0.292908 11.2929L1.70712 12.7071L5.50001 8.91421L8.50001 11.9142L12.7071 7.70711L15 10L16 9L16 3H10Z"
              fill="#FFFFFF"
            />
          </svg>
        ) : (
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 13L9.00001 12L11.2929 9.70712L8.50001 6.91423L5.50001 9.91423L0.292908 4.70712L1.70712 3.29291L5.50001 7.0858L8.50001 4.0858L12.7071 8.29291L15 6.00001L16 7.00001L16 13H10Z"
              fill="#FFFFFF"
            />
          </svg>
        )}
        <div className="ml-1 text-xs sm:text-sm md:text-base text-white italic">
          {dailyResults.percentage}%
        </div>
        <div className="ml-1 text-xs sm:text-sm md:text-base text-white italic">Today</div>
        {currentPath === '/' && (
          <Link to="/wallet" className="ml-auto text-xs sm:text-sm md:text-base italic">
            View All &gt;
          </Link>
        )}
      </div>
      <div
        className={currentPath === '/' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-xl text-center'}
      >
        {formatUSD(dailyResults.currentBalance)}
      </div>
    </div>
  );
}
