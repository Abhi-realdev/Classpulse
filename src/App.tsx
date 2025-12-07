import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import FeedbackForm from './components/FeedbackForm';
import Leaderboard from './components/Leaderboard';
import TeacherDashboard from './components/TeacherDashboard';
import Navigation from './components/Navigation';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'feedback' | 'leaderboard' | 'dashboard'>('feedback');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="py-8">
        {currentView === 'feedback' && <FeedbackForm />}
        {currentView === 'leaderboard' && (
          <div className="max-w-4xl mx-auto px-4">
            <Leaderboard isPublic={false} />
          </div>
        )}
        {currentView === 'dashboard' && <TeacherDashboard />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
