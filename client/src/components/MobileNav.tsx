import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function MobileNav() {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });

  const iconSmall = viewport.w >= 720 && viewport.h >= 480 ? '42px' : '28px';
  const iconSize = viewport.w >= 1024 ? '84px' : iconSmall;
  const paddingSize = viewport.w >= 720 && viewport.h >= 480 ? 'mx-6 my-8' : 'm-6';

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return (
    <div className="fixed z-50 left-0 bottom-0 w-full landscape:h-30">
      <div className="flex justify-center landscape:absolute landscape:inset-0 mx-auto bg-linear-to-t from-indigo-950 from-80% to-transparent">
        <div className="flex gap-2 md:gap-5">
          <button
            className={`flex flex-col justify-center items-center ${paddingSize}`}
            onClick={() => navigate('/')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={iconSize}
              width={iconSize}
              viewBox="0 0 58.97 57.86"
              className="mx-auto mb-1.5"
            >
              <title>home</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    id="home"
                    d="M58.24,27.76l-27-27A2.49,2.49,0,0,0,29.44,0h0a2.51,2.51,0,0,0-1.77.73L.8,27.66a2.61,2.61,0,0,0-.27,3.45,2.5,2.5,0,0,0,3.71.18L6.93,28.6V47.37A10.49,10.49,0,0,0,17.42,57.86h24.1A10.49,10.49,0,0,0,52,47.37V28.61L54.7,31.3a2.51,2.51,0,0,0,3.54,0A2.5,2.5,0,0,0,58.24,27.76ZM35.47,47.35h-12a2,2,0,0,1-2-2V39.79a8.18,8.18,0,0,1,7.47-8.25,8,8,0,0,1,8.53,8v5.83A2,2,0,0,1,35.47,47.35Z"
                    fill="#FFFFFF"
                  />
                </g>
              </g>
            </svg>
            <span className="mx-auto text-xs md:text-sm text-white">Home</span>
          </button>
          <button
            className={`flex flex-col justify-center items-center ${paddingSize}`}
            onClick={() => navigate('/wallet')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={iconSize}
              width={iconSize}
              viewBox="0 0 59 59"
              className="mx-auto mb-1.5"
            >
              <title>wallet</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <g id="wallet">
                    <path
                      d="M49,14V10.5A10.51,10.51,0,0,0,38.5,0h-28A10.51,10.51,0,0,0,0,10.5v38A10.51,10.51,0,0,0,10.5,59h38A10.51,10.51,0,0,0,59,48.5v-24A10.5,10.5,0,0,0,49,14ZM8.5,14A3.5,3.5,0,0,1,5,10.5,5.51,5.51,0,0,1,10.5,5h28A5.51,5.51,0,0,1,44,10.5V14H8.5ZM53,44.5H40.5a8,8,0,0,1,0-16H53Z"
                      fill="#FFFFFF"
                    />
                    <circle cx="44.5" cy="36.5" r="3" fill="#FFFFFF" />
                  </g>
                </g>
              </g>
            </svg>
            <span className="mx-auto text-xs md:text-sm text-white">Wallet</span>
          </button>
          <button
            className={`flex flex-col justify-center items-center ${paddingSize}`}
            onClick={() => navigate('/activities')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={iconSize}
              width={iconSize}
              viewBox="0 0 60 60"
              className="mx-auto mb-1.5"
            >
              <title>chart</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    d="M57,54H6V3A3,3,0,0,0,0,3V57a3,3,0,0,0,3,3H57a3,3,0,0,0,0-6Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M57,10.23H44.84a3,3,0,0,0,0,6h5.59L38,30.59,31,18.26a3,3,0,0,0-4.87-.49L12.74,33.19a3,3,0,1,0,4.52,3.93L27.89,24.91l7,12.33a3,3,0,0,0,2.32,1.52h.3a3,3,0,0,0,2.26-1L54,21.27v4.12a3,3,0,0,0,6,0V13.23A3,3,0,0,0,57,10.23Z"
                    fill="#FFFFFF"
                  />
                </g>
              </g>
            </svg>
            <span className="mx-auto text-xs md:text-sm text-white">Activities</span>
          </button>
          <button
            className={`flex flex-col justify-center items-center ${paddingSize}`}
            onClick={() => navigate('/profile')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={iconSize}
              width={iconSize}
              viewBox="0 0 59 59"
              className="mx-auto mb-1.5"
            >
              <title>profile</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    id="account_circle"
                    data-name="account circle"
                    d="M29.5,0A29.5,29.5,0,1,0,59,29.5,29.53,29.53,0,0,0,29.5,0Zm0,12.43A10.82,10.82,0,1,1,18.68,23.25,10.83,10.83,0,0,1,29.5,12.43ZM29.5,54a24.43,24.43,0,0,1-17.34-7.21,19.87,19.87,0,0,1,34.68,0A24.43,24.43,0,0,1,29.5,54Z"
                    fill="#FFFFFF"
                  />
                </g>
              </g>
            </svg>
            <span className="mx-auto text-xs md:text-sm text-white">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
