import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import ForumPage from '@/pages/ForumPage';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
import MessagesPage from '@/pages/MessagesPage';
import ProfilePage from '@/pages/ProfilePage';
import ThreadPage from '@/pages/ThreadPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="forum/:threadId" element={<ThreadPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;