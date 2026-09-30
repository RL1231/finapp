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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-full mx-auto">
        {isAuthenticated ? (
          <>
            <div className="mx-8 landscape:mx-30 sm:mx-30 lg:mx-40 mt-18 md:landscape:mt-5 lg:mt-12 landscape:mb-30">
              {children}
            </div>
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
