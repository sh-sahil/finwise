import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppProvider } from './contexts/AppContext';
import FinancialProfileForm from './components/Form';

// Lazy load components
const Header = lazy(() => import('./components/Header'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));
const Footer = lazy(() => import('./components/Footer'));

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ error }) => (
  <div role="alert" className="text-center p-8 bg-red-100">
    <p className="text-2xl text-red-600">Oops! Something went wrong:</p>
    <pre className="text-red-500">{error.message}</pre>
  </div>
);

const App = () => {
  return (
    <AppProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <div 
            className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 scroll-smooth" 
            style={{ scrollBehavior: 'smooth' }}
          >
            <Header />
            <main>
              <HeroSection />
              <FeaturesSection />
            </main>
            <Footer />
          </div>
          <div className="App">
      <h1>AI Financial Advisor</h1>
      <FinancialProfileForm />
    </div>
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
    
  );
};

export default App;