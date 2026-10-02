import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router';

export default function QuickActions() {
  const { pathname: currentPath } = useLocation();

  const [gridStyle, setGridStyle] = useState('grid grid-cols-4 place-items-center gap-x-1');
  const [btnStyle, setBtnStyle] = useState(
    'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[70px] min-h-[70px]',
  );
  const [svgStyle, setSvgStyle] = useState('38px');
  const [txtStyle, setTxtStyle] = useState('text-[#c3b1e1]');

  const isPage = useCallback(() => {
    switch (currentPath) {
      case '/activities/daily':
      case '/activities/weekly':
      case '/activities/monthly':
      case '/activities/ytd':
        console.log(currentPath);
        return true;
      default:
        return false;
    }
  }, [currentPath]);

  useEffect(() => {
    function updateViewport() {
      if (window.innerWidth < 480) {
        console.log('xs - iphone se/14/15/16/17', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[70px] min-h-[70px]',
        );
        setSvgStyle('38px');
        setTxtStyle('text-[#c3b1e1] text-xs');
      }

      if (window.innerWidth >= 480 && window.innerWidth < 640) {
        console.log('xs - default', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[70px] min-h-[70px]',
        );
        setSvgStyle('38px');
        setTxtStyle('text-[#c3b1e1] text-xs');
      }

      if (window.innerWidth >= 640 && window.innerWidth < 768 && window.innerHeight < 480) {
        console.log('sm - iphone se (landscape)', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[70px] min-h-[70px]',
        );
        setSvgStyle('38px');
        setTxtStyle('text-[#c3b1e1] text-xs');
      }

      if (
        window.innerWidth >= 640 &&
        window.innerWidth < 768 &&
        window.innerHeight >= 480 &&
        isPage()
      ) {
        console.log('sm - ipad mini', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[100px] min-h-[100px]',
        );
        setSvgStyle('42px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (
        window.innerWidth >= 640 &&
        window.innerWidth < 768 &&
        window.innerHeight >= 480 &&
        !isPage()
      ) {
        console.log('sm - ipad mini', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-2 place-items-center gap-x-1 gap-y-10 px-10');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[175px] min-h-[175px]',
        );
        setSvgStyle('90px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1024 && window.innerHeight < 480) {
        console.log('md - iphone 14/15/16/17 (landscape)', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[120px] min-h-[120px]',
        );
        setSvgStyle('42px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (
        window.innerWidth >= 768 &&
        window.innerWidth < 1024 &&
        window.innerHeight >= 720 &&
        isPage()
      ) {
        console.log('md - ipad pro', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1 ');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[120px] min-h-[120px]',
        );
        setSvgStyle('42px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (
        window.innerWidth >= 768 &&
        window.innerWidth < 1024 &&
        window.innerHeight >= 1024 &&
        !isPage()
      ) {
        console.log('md - ipad pro', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-2 place-items-center gap-x-1 gap-y-15 px-10');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[200px] min-h-[200px]',
        );
        setSvgStyle('90px');
        setTxtStyle('text-[#c3b1e1] text-xl');
      }

      if (window.innerWidth >= 1024 && window.innerWidth < 1280 && isPage()) {
        console.log('lg - laptop', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1 px-30');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[120px] min-h-[120px]',
        );
        setSvgStyle('42px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (window.innerWidth >= 1024 && window.innerWidth < 1280 && !isPage()) {
        console.log('lg - laptop', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center px-10');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[175px] min-h-[175px]',
        );
        setSvgStyle('90px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (window.innerWidth >= 1280 && isPage()) {
        setGridStyle('grid grid-cols-4 place-items-center gap-x-1');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[120px] min-h-[120px]',
        );
        setSvgStyle('42px');
        setTxtStyle('text-[#c3b1e1] text-lg');
      }

      if (window.innerWidth >= 1280 && !isPage()) {
        console.log('xl - desktop', window.innerWidth, window.innerHeight);
        setGridStyle('grid grid-cols-4 place-items-center px-10');
        setBtnStyle(
          'flex flex-col justify-center items-center border border-[#c3b1e1] rounded-2xl min-w-[200px] min-h-[200px]',
        );
        setSvgStyle('120px');
        setTxtStyle('text-[#c3b1e1] text-xl');
      }
    }

    addEventListener('resize', updateViewport);

    updateViewport();

    return () => removeEventListener('resize', updateViewport);
  }, [isPage]);

  const style = {
    btn: btnStyle,
    svg: svgStyle,
    txt: txtStyle,
  };

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-4 md:mb-6 lg:mb-4">
        {currentPath === '/' ? (
          <span className="text-xl sm:text-2xl lg:text-2xl">Quick Actions</span>
        ) : null}
      </div>
      <div className={gridStyle}>
        <Link to="/activities/daily">
          <button className={style.btn}>
            <span className={style.txt}>Daily</span>
            <svg
              width={style.svg}
              height={style.svg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12H12M12 3V12M12 12L16.9948 19.4879"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        <Link to="/activities/weekly">
          <button className={style.btn}>
            <span className={style.txt}>Week</span>
            <svg
              width={style.svg}
              height={style.svg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 14.6C3 14.0399 3 13.7599 3.10899 13.546C3.20487 13.3578 3.35785 13.2049 3.54601 13.109C3.75992 13 4.03995 13 4.6 13H5.4C5.96005 13 6.24008 13 6.45399 13.109C6.64215 13.2049 6.79513 13.3578 6.89101 13.546C7 13.7599 7 14.0399 7 14.6V19.4C7 19.9601 7 20.2401 6.89101 20.454C6.79513 20.6422 6.64215 20.7951 6.45399 20.891C6.24008 21 5.96005 21 5.4 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V14.6Z"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 4.6C10 4.03995 10 3.75992 10.109 3.54601C10.2049 3.35785 10.3578 3.20487 10.546 3.10899C10.7599 3 11.0399 3 11.6 3H12.4C12.9601 3 13.2401 3 13.454 3.10899C13.6422 3.20487 13.7951 3.35785 13.891 3.54601C14 3.75992 14 4.03995 14 4.6V19.4C14 19.9601 14 20.2401 13.891 20.454C13.7951 20.6422 13.6422 20.7951 13.454 20.891C13.2401 21 12.9601 21 12.4 21H11.6C11.0399 21 10.7599 21 10.546 20.891C10.3578 20.7951 10.2049 20.6422 10.109 20.454C10 20.2401 10 19.9601 10 19.4V4.6Z"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 10.6C17 10.0399 17 9.75992 17.109 9.54601C17.2049 9.35785 17.3578 9.20487 17.546 9.10899C17.7599 9 18.0399 9 18.6 9H19.4C19.9601 9 20.2401 9 20.454 9.10899C20.6422 9.20487 20.7951 9.35785 20.891 9.54601C21 9.75992 21 10.0399 21 10.6V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H18.6C18.0399 21 17.7599 21 17.546 20.891C17.3578 20.7951 17.2049 20.6422 17.109 20.454C17 20.2401 17 19.9601 17 19.4V10.6Z"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        <Link to="/activities/monthly">
          <button className={style.btn}>
            <span className={style.txt}>Month</span>
            <svg
              width={style.svg}
              height={style.svg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3L14 9L10 5L3 11M4.5 21C3.67157 21 3 20.3284 3 19.5V17.5C3 16.6716 3.67157 16 4.5 16C5.32843 16 6 16.6716 6 17.5V19.5C6 20.3284 5.32843 21 4.5 21ZM11.5 21C10.6716 21 10 20.3284 10 19.5V14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5V19.5C13 20.3284 12.3284 21 11.5 21ZM18.5 21C17.6716 21 17 20.3284 17 19.5V16.5C17 15.6716 17.6716 15 18.5 15C19.3284 15 20 15.6716 20 16.5V19.5C20 20.3284 19.3284 21 18.5 21Z"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
        <Link to="/activities/ytd">
          <button className={style.btn}>
            <span className={style.txt}>YTD</span>
            <svg
              width={style.svg}
              height={style.svg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 15L12 9L16 13L21 7"
                stroke="#c3b1e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
