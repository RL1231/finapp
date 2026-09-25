import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function SecuredContent({ children }: { children: React.ReactNode }) {
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const { keycloak, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const updateViewport = () => setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, [viewport]);

  function handleContentSize() {
    // xs breakpoint
    if (viewport.w < 480 && viewport.h > 660) return 'mx-8';
    // xs breakpoint:landscape - iphone se
    if (viewport.w > 620 && viewport.h < 420) return 'mx-30';
    // xs breakpoint:landscape - iphone 17
    if (viewport.w > 820 && viewport.h < 420) return 'mx-30';
    // sm breakpoint - ipad mini
    if (viewport.w > 720 && viewport.h > 1080) return 'mx-30';
    // sm breakpoint:landscape - ipad mini
    if (viewport.w > 1080 && viewport.h > 720 && viewport.h < 1200) return 'mx-40';

    return '';
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-full mx-auto">
        {isAuthenticated ? (
          <>
            <div className={`${handleContentSize()}`}>{children}</div>
          </>
        ) : (
          <div className="px-16 py-48">
            <h1 className="text-white text-4xl font-bold pb-2 text-center">FinApp</h1>
            <p className="text-white pt-4 pb-8 text-center text-2xl">Welcome to Finapp!</p>
            <button
              onClick={() => keycloak?.login()}
              className="bg-linear-to-r from-purple-500 via-indigo-500 to-indigo-600 rounded-full p-2 w-full mt-12 shadow"
            >
              <span className="text-white text-xl font-bold">Log In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SecuredContent;
