import { Route, Routes, BrowserRouter } from 'react-router';
import SecuredContent from './components/SecuredContent.tsx';
import HomePage from './components/pages/HomePage.tsx';
import ActivitiesPage from './components/pages/ActivitiesPage.tsx';
import ProfilePage from './components/pages/ProfilePage.tsx';
import WalletPage from './components/pages/WalletPage.tsx';
import Daily from './components/Daily.tsx';
import Week from './components/Week.tsx';
import Month from './components/Month.tsx';
import Ytd from './components/Ytd.tsx';

function App() {
  return (
    <SecuredContent>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/activities" element={<ActivitiesPage />}>
            <Route path="daily" element={<Daily />} />
            <Route path="weekly" element={<Week />} />
            <Route path="monthly" element={<Month />} />
            <Route path="ytd" element={<Ytd />} />
          </Route>
          <Route path={`/profile`} element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </SecuredContent>
  );
}

export default App;
