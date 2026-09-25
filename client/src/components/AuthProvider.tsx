import React, { useEffect, useState, useRef, useMemo } from 'react';
import { keycloak } from '../security/keycloak';
import { AuthContext } from '../security/AuthContext';
import { loadUserData } from '../api/api';
import { randomDate } from '../utilities/randomDate';
import type { User, FilteredReports } from '../types/types';
import { getAggregatedData } from '../utilities/getAggregatedData';

const keycloakInstance = keycloak;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | undefined>({} as User);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    keycloakInstance
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then(async (authenticated) => {
        if (authenticated) {
          setIsAuthenticated(true);

          try {
            setIsLoading(true);
            const data = await loadUserData(keycloakInstance?.token);
            setUserData(data);
          } catch (error) {
            console.error('Loading user data in AuthProvider failed: ', error);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Keycloak initialization failed', err);
        setIsLoading(false);
      });
  }, []);

  const currentDate = useMemo(() => {
    if (!userData?.account) return undefined;
    const startDate = new Date('2025-7-20');
    const endDate = new Date('2025-12-31');

    return randomDate(startDate, endDate);
  }, [userData]);

  const userReports = useMemo<FilteredReports | undefined>(() => {
    if (!userData?.account || !currentDate) return undefined;

    return getAggregatedData(userData.account.reports, currentDate);
  }, [userData, currentDate]);

  return (
    <AuthContext.Provider
      value={{
        keycloak: keycloakInstance,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        userData: userData,
        currentDate: currentDate,
        reports: userReports,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
