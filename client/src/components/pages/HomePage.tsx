import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CurrentBalance from '../CurrentBalance';
import MobileNav from '../MobileNav';
import QuickActions from '../QuickActions';
import Activity from '../Activity';

export default function HomePage() {
  const { userData, isLoading, reports } = useAuth();
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, [viewport]);

  const bellIcon = () => {
    if (viewport.width < 660) return '18px';
    if (viewport.width < 780) return '28px';

    return '32px';
  };

  if (!isLoading && userData)
    return (
      <div className="mt-18 landscape:mb-30 md:landscape:mt-5">
        <div key={userData.id} className="text-white font-semibold">
          {userData.account ? (
            <div>
              <div className="mb-4 md:mb-6 lg:mb-4">
                <div className="w-full mb-6 md:landscape:mt-10 md:landscape:mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={bellIcon()}
                    height={bellIcon()}
                    viewBox="0 0 47.81 59"
                    className="ml-auto"
                  >
                    <title>notifications</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g id="notifications">
                          <path
                            d="M46.66,36.58l-2.52-3.73a5.84,5.84,0,0,1-1-3.29V19.23A19.25,19.25,0,0,0,23,0,19.45,19.45,0,0,0,4.67,19.7v9.86a5.84,5.84,0,0,1-1,3.29L1.15,36.58A6.68,6.68,0,0,0,6.68,47H41.13a6.68,6.68,0,0,0,5.53-10.42Z"
                            fill="#FFFFFF"
                          />
                          <path
                            d="M23.93,59a12.5,12.5,0,0,0,11.62-8L12.26,51A12.49,12.49,0,0,0,23.93,59Z"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-2xl">
                    Hello, {userData.account.firstName} {userData.account.lastName}!
                  </p>
                </div>
              </div>
              <CurrentBalance />
              <QuickActions />
              <div>{reports?.daily ? <Activity report={reports.daily} /> : null}</div>
              <MobileNav />
            </div>
          ) : (
            <p className="md:text-2xl text-white font-semibold">Is loading...</p>
          )}
        </div>
      </div>
    );
}
