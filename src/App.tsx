import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { RefreshCw } from 'lucide-react';
import { fetchLiveMatches } from './services/api';
import { MatchCard } from './components/MatchCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const queryClient = new QueryClient();

function CricketApp() {
  const { data, isLoading, isError, refetch } = useQuery('matches', fetchLiveMatches, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading matches. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Cricket Scores</h1>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No matches available at the moment.</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <CricketApp />
      </div>
    </QueryClientProvider>
  );
}

export default App;