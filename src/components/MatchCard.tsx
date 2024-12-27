import React from 'react';
import { Trophy } from 'lucide-react';
import { Match } from '../types/cricket';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const getScoreDisplay = (teamIndex: number) => {
    if (!match.score || !match.score[teamIndex]) return 'Yet to bat';
    const score = match.score[teamIndex];
    return `${score.r}/${score.w} (${score.o} ov)`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <Trophy className="w-6 h-6 text-gray-700" />
        <span className="px-3 py-1 text-sm font-medium bg-black text-white rounded-full">
          {match.status}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{match.name}</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.teams[0]}</span>
          <span className="text-lg font-bold">{getScoreDisplay(0)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.teams[1]}</span>
          <span className="text-lg font-bold">{getScoreDisplay(1)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">{match.venue}</p>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(match.dateTimeGMT).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};