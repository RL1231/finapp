import { Link, useLocation } from 'react-router';
import { formatDate } from '../utilities/formatDate';
import { formatUSD } from '../utilities/formatCurrency';
import type { Report } from '../types/types';

interface ActivityProps {
  report: Report;
}

export default function Activity({ report }: ActivityProps) {
  const { pathname: currentPath } = useLocation();

  let netIncome = 0;
  let reportId = 0;
  if (report) {
    reportId = report.id;
    netIncome = report.income - report.expenditure;
  }
  const absNet = Math.abs(netIncome);

  const styleNetIncome = {
    positive: 'text-[#90fda9]',
    negative: 'text-[#ff6384]',
  };

  const reportCurrentDate = report ? new Date(report.dateTime) : null;

  return (
    <div className="sm:mb-2">
      <div className={`flex ${currentPath === '/' ? 'mb-3 md:mb-6 lg:mb-3' : ''}`}>
        <div>
          <span className={`text-xl sm:text-2xl ${currentPath === '/' ? '' : 'hidden'}`}>
            My Activities
          </span>
        </div>
        {currentPath === '/' ? (
          <Link to="/activities" className="text-xs sm:text-sm my-auto p-2 ml-auto">
            <span className={`italic`}>View All &gt;</span>
          </Link>
        ) : null}
      </div>
      <div>
        <div className="flex flex-2 w-full px-4 py-1.5 sm:py-2 rounded-full bg-gray-500 border border-gray-300">
          <div className="flex flex-col">
            <span className="mr-auto text-[8px] sm:text-xs italic">
              {reportCurrentDate ? formatDate(reportCurrentDate) : null}
            </span>
            <span className="mr-auto text-[10px] sm:text-sm italic">UID {reportId}</span>
          </div>
          <div
            className={`ml-auto sm:text-xl italic ${netIncome > 0 ? styleNetIncome.positive : styleNetIncome.negative}`}
          >
            {netIncome > 0 ? '+' : '-'} {formatUSD(absNet)}
          </div>
        </div>
      </div>
    </div>
  );
}
