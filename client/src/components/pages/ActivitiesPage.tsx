import { Link, Outlet, useLocation } from 'react-router';
import MobileNav from '../MobileNav';
import QuickActions from '../QuickActions';
import { useAuth } from '../../hooks/useAuth';
import Activity from '../Activity';

export default function Activities() {
  const { reports } = useAuth();
  const { pathname: currentPath } = useLocation();
  const activities = reports?.weekly
    ? [...reports.weekly].sort(
        (firstReport, secondReport) =>
          Date.parse(secondReport.dateTime) - Date.parse(firstReport.dateTime),
      )
    : [];
  let pathData: { pathName: string; title: string };

  switch (currentPath) {
    case '/activities/daily':
      pathData = { pathName: '/activities', title: 'Daily' };
      break;
    case '/activities/weekly':
      pathData = { pathName: '/activities', title: 'Weekly' };
      break;
    case '/activities/monthly':
      pathData = { pathName: '/activities', title: 'Monthly' };
      break;
    case '/activities/ytd':
      pathData = { pathName: '/activities', title: 'YTD' };
      break;
    default:
      pathData = { pathName: '/', title: 'Activities' };
      break;
  }

  return (
    <div className="mt-18 mb-40 landscape:mb-30 text-white font-semibold">
      <div className="mb-2">
        {pathData && (
          <Link to={pathData.pathName} className="text-xl sm:text-2xl font-semibold">
            &#60; {pathData.title}
          </Link>
        )}
      </div>
      {currentPath === '/activities' ? (
        <div>
          <QuickActions />
        </div>
      ) : null}
      {currentPath === '/activities' ? (
        <div className="flex flex-col gap-y-4">
          <span className="text-lg sm:text-2xl text-white font-semibold">Recent Activity</span>
          {activities.slice(0, 5).map((report) => (
            <Activity key={report.id} report={report} />
          ))}
        </div>
      ) : null}
      <Outlet />
      <MobileNav />
    </div>
  );
}
