import { useState, useEffect } from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { supabase, TeacherWithStats } from '../lib/supabase';

interface LeaderboardProps {
  isPublic?: boolean;
}

export default function Leaderboard({ isPublic = false }: LeaderboardProps) {
  const [topTeachers, setTopTeachers] = useState<TeacherWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('*');

      if (feedbackError) throw feedbackError;

      const { data: teachersData, error: teachersError } = await supabase
        .from('teachers')
        .select('*');

      if (teachersError) throw teachersError;

      const teacherStats = teachersData.map(teacher => {
        const teacherFeedback = feedbackData.filter(f => f.teacher_id === teacher.id);

        if (teacherFeedback.length === 0) {
          return {
            ...teacher,
            average_rating: 0,
            feedback_count: 0,
          };
        }

        const ratingKeys = [
          'clarity_explanation', 'simplification', 'examples_analogies', 'engagement',
          'pace_teaching', 'depth_knowledge', 'accuracy_info', 'concept_reinforcement',
          'problem_solving', 'clarity_instructions', 'patience_approachability',
          'motivation_encouragement', 'adaptability', 'visual_aids', 'technology_integration',
          'interactive_methods', 'helping_understand', 'critical_thinking', 'homework_support',
          'openness_feedback'
        ];

        let totalRating = 0;
        let ratingCount = 0;

        teacherFeedback.forEach(feedback => {
          ratingKeys.forEach(key => {
            const rating = (feedback as any)[key];
            if (rating) {
              totalRating += rating;
              ratingCount++;
            }
          });
        });

        const avgRating = ratingCount > 0 ? totalRating / ratingCount : 0;

        return {
          ...teacher,
          average_rating: avgRating,
          feedback_count: teacherFeedback.length,
        };
      });

      const filtered = teacherStats.filter(t => t.average_rating >= 4.0);
      const sorted = filtered.sort((a, b) => b.average_rating - a.average_rating);
      const top10 = sorted.slice(0, 10);

      setTopTeachers(top10);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${isPublic ? 'bg-white/10 backdrop-blur-lg' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const medalColors = ['text-yellow-500', 'text-gray-400', 'text-orange-600'];

  return (
    <div className={`${isPublic ? 'bg-white/10 backdrop-blur-lg border border-white/20' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="flex items-center gap-3 mb-6">
        <Trophy className={`w-8 h-8 ${isPublic ? 'text-yellow-300' : 'text-yellow-500'}`} />
        <h2 className={`text-2xl font-bold ${isPublic ? 'text-white' : 'text-gray-900'}`}>
          Top 10 Teachers
        </h2>
      </div>

      {topTeachers.length === 0 ? (
        <div className={`text-center py-8 ${isPublic ? 'text-white/80' : 'text-gray-500'}`}>
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No teachers with ratings ≥ 4.0 yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className={`${
                isPublic
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                  : 'bg-gradient-to-r from-gray-50 to-white hover:shadow-md border border-gray-200'
              } rounded-xl p-4 transition-all`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${
                  index < 3
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                    : isPublic ? 'bg-white/20' : 'bg-gray-200'
                } flex items-center justify-center`}>
                  {index < 3 ? (
                    <Trophy className={`w-6 h-6 ${medalColors[index]}`} />
                  ) : (
                    <span className={`text-lg font-bold ${isPublic ? 'text-white' : 'text-gray-600'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${isPublic ? 'text-white' : 'text-gray-900'} truncate`}>
                    {teacher.name}
                  </h3>
                  <p className={`text-sm ${isPublic ? 'text-white/70' : 'text-gray-600'}`}>
                    {teacher.subject}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <Star className={`w-5 h-5 ${isPublic ? 'text-yellow-300' : 'text-yellow-500'} fill-current`} />
                    <span className={`text-xl font-bold ${isPublic ? 'text-white' : 'text-gray-900'}`}>
                      {teacher.average_rating.toFixed(2)}
                    </span>
                  </div>
                  <span className={`text-xs ${isPublic ? 'text-white/60' : 'text-gray-500'}`}>
                    {teacher.feedback_count} review{teacher.feedback_count !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
