import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import MobileNav from '../MobileNav';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const { keycloak, userData } = useAuth();
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [img, setImg] = useState('100px');
  const [svg, setSvg] = useState('16px');

  const firstName = userData?.account ? userData.account.firstName : '';
  const lastName = userData?.account ? userData.account.lastName : '';
  const email = userData ? userData.email : '';

  useEffect(() => {
    function updateViewport() {
      setViewport({ w: window.innerWidth, h: window.innerHeight });

      if (viewport.w < 640) {
        setImg('100px');
        setSvg('16px');
      } else {
        setImg('150px');
        setSvg('20px');
      }
    }

    updateViewport();

    addEventListener('resize', updateViewport);
    return removeEventListener('resize', updateViewport);
  }, [viewport.w, viewport.h]);

  return (
    <div className="w-full mt-18 landscape:mb-30">
      <Link to="/" className="flex mb-2 text-xl sm:text-2xl text-white font-semibold">
        <span>&#60; Profile</span>
      </Link>
      <div className="flex flex-col justify-center items-center sm:mt-20 lg:mt-0">
        <img src="user.png" width={img} className="mb-2 sm:mb-4" />
        <span className="text-lg sm:text-2xl text-white font-semibold">{`${firstName} ${lastName}`}</span>
        <div className="flex flex-2 gap-2 justify-center items-center mb-2 sm:mb-4">
          <svg
            xmlns="http://www.w4.org/2000/svg"
            viewBox="0 0 59 51"
            width={'16px'}
            height={'16px'}
          >
            <title>mail</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  id="mail"
                  d="M48.5,0h-38A10.51,10.51,0,0,0,0,10.5v30A10.51,10.51,0,0,0,10.5,51h38A10.51,10.51,0,0,0,59,40.5v-30A10.51,10.51,0,0,0,48.5,0Zm3.23,17.31L33.79,27.4a8.85,8.85,0,0,1-8.58,0L7.27,17.31A2.5,2.5,0,1,1,9.73,13L27.66,23a3.77,3.77,0,0,0,3.68,0L49.27,13a2.5,2.5,0,1,1,2.46,4.35Z"
                  fill="#ffffff"
                />
              </g>
            </g>
          </svg>
          <span className="mb-1 text-sm sm:text-base text-white font-semibold italic">{email}</span>
        </div>
        <div className="flex flex-col w-full mb-4 sm:mb-6 px-4 py-2 sm:px-6 sm:py-4 lg:px-10 rounded-xl bg-gray-500 border border-gray-300">
          <span className="mb-2 text-xs sm:text-base text-gray-300 italic">
            Personal Information
          </span>
          <div className="flex w-full mb-3 text-sm sm:text-lg text-white font-semibold">
            <span>Email Address</span>
            <span className="ml-auto">&gt;</span>
          </div>
          <div className="flex w-full mb-3 text-sm sm:text-lg text-white font-semibold">
            <span>Name</span>
            <span className="ml-auto">&gt;</span>
          </div>
        </div>
        <div className="flex flex-col w-full mb-8 px-4 py-2 sm:px-6 sm:py-4 lg:px-10 rounded-xl bg-gray-500 border border-gray-300">
          <span className="mb-2 text-xs sm:text-base text-gray-300 italic">Security</span>
          <div className="flex w-full mb-3 text-sm sm:text-lg text-white font-semibold">
            <span>Change Password</span>
            <span className="ml-auto">&gt;</span>
          </div>
        </div>
      </div>
      <div>
        <button
          className={`flex flex-2 gap-2 justify-center items-center rounded-xl w-full h-12 bg-linear-to-r from-purple-400 via-indigo-500 to-indigo-600 mb-6 text-sm text-white font-semibold shadow-indigo-900 sm:p-7`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 59" width={svg} height={svg}>
            <title>window</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="window">
                  <path
                    d="M11.5,11a2.5,2.5,0,0,0,0-5h-9A2.5,2.5,0,0,0,0,8.5v42A2.5,2.5,0,0,0,2.5,53h9a2.5,2.5,0,0,0,0-5H5V11Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M50.24,8.11l-26-8A2.53,2.53,0,0,0,22,.49a2.52,2.52,0,0,0-1,2v54A2.49,2.49,0,0,0,23.5,59a2.71,2.71,0,0,0,.74-.11l26-8A2.5,2.5,0,0,0,52,48.5v-38A2.5,2.5,0,0,0,50.24,8.11ZM35,32.67a2.5,2.5,0,0,1-5,0V26.33a2.5,2.5,0,0,1,5,0Z"
                    fill="#ffffff"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span className="sm:text-xl" onClick={() => keycloak?.logout()}>
            Sign Out
          </span>
        </button>
      </div>
      <MobileNav />
    </div>
  );
}
