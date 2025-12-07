import { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, Star, TrendingUp, Users, Award, Calendar } from 'lucide-react';
import { supabase, Feedback, Teacher } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface FeedbackStats {
  totalFeedback: number;
  averageRating: number;
  parameterAverages: Record<string, number>;
  recentComments: { comment: string; date: string; studentEmail: string }[];
  leaderboardRank: number | null;
  totalTeachers: number;
}

const parameters = [
  { key: 'clarity_explanation', label: 'Clarity of Explanation' },
  { key: 'simplification', label: 'Simplification of Topics' },
  { key: 'examples_analogies', label: 'Examples & Analogies' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'pace_teaching', label: 'Pace of Teaching' },
  { key: 'depth_knowledge', label: 'Depth of Knowledge' },
  { key: 'accuracy_info', label: 'Accuracy' },
  { key: 'concept_reinforcement', label: 'Concept Reinforcement' },
  { key: 'problem_solving', label: 'Problem-Solving' },
  { key: 'clarity_instructions', label: 'Clear Instructions' },
  { key: 'patience_approachability', label: 'Patience' },
  { key: 'motivation_encouragement', label: 'Motivation' },
  { key: 'adaptability', label: 'Adaptability' },
  { key: 'visual_aids', label: 'Visual Aids' },
  { key: 'technology_integration', label: 'Technology Use' },
  { key: 'interactive_methods', label: 'Interactive Methods' },
  { key: 'helping_understand', label: 'Help Understanding' },
  { key: 'critical_thinking', label: 'Critical Thinking' },
  { key: 'homework_support', label: 'Homework Support' },
  { key: 'openness_feedback', label: 'Open to Feedback' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user?.email) return;

    try {
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (teacherError) throw teacherError;

      if (!teacherData) {
        setLoading(false);
        return;
      }

      setTeacher(teacherData);

      const { data: allFeedback, error: allFeedbackError } = await supabase
        .from('feedback')
        .select('*');

      if (allFeedbackError) throw allFeedbackError;

      const { data: allTeachers, error: allTeachersError } = await supabase
        .from('teachers')
        .select('*');

      if (allTeachersError) throw allTeachersError;

      const teacherFeedback = allFeedback.filter(f => f.teacher_id === teacherData.id);

      if (teacherFeedback.length === 0) {
        setStats({
          totalFeedback: 0,
          averageRating: 0,
          parameterAverages: {},
          recentComments: [],
          leaderboardRank: null,
          totalTeachers: allTeachers.length,
        });
        setLoading(false);
        return;
      }

      const parameterAverages: Record<string, number> = {};
      let totalRatingSum = 0;
      let totalRatingCount = 0;

      parameters.forEach(param => {
        const ratings = teacherFeedback
          .map(f => (f as any)[param.key])
          .filter(r => r !== null && r !== undefined);

        if (ratings.length > 0) {
          const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
          parameterAverages[param.key] = avg;
          totalRatingSum += avg;
          totalRatingCount++;
        }
      });

      const overallAverage = totalRatingCount > 0 ? totalRatingSum / totalRatingCount : 0;

      const teacherRankings = allTeachers.map(t => {
        const tFeedback = allFeedback.filter(f => f.teacher_id === t.id);

        if (tFeedback.length === 0) return { teacher: t, avgRating: 0 };

        let sum = 0;
        let count = 0;

        parameters.forEach(param => {
          const ratings = tFeedback
            .map(f => (f as any)[param.key])
            .filter(r => r !== null && r !== undefined);

          if (ratings.length > 0) {
            sum += ratings.reduce((s, r) => s + r, 0) / ratings.length;
            count++;
          }
        });

        return {
          teacher: t,
          avgRating: count > 0 ? sum / count : 0,
        };
      });

      const sortedRankings = teacherRankings
        .filter(tr => tr.avgRating >= 4.0)
        .sort((a, b) => b.avgRating - a.avgRating);

      const myRank = sortedRankings.findIndex(tr => tr.teacher.id === teacherData.id);

      const recentComments = teacherFeedback
        .filter(f => f.comments && f.comments.trim() !== '')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10)
        .map(f => ({
          comment: f.comments,
          date: new Date(f.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          studentEmail: f.student_email,
        }));

      setStats({
        totalFeedback: teacherFeedback.length,
        averageRating: overallAverage,
        parameterAverages,
        recentComments,
        leaderboardRank: myRank >= 0 ? myRank + 1 : null,
        totalTeachers: sortedRankings.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
          <Users className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Account Not Found</h2>
          <p className="text-gray-700">
            Your account is not registered as a teacher. Please contact the administrator.
          </p>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalFeedback === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {teacher.name}
          </h1>
          <p className="text-gray-600 mb-8">{teacher.subject}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Feedback Yet</h2>
            <p className="text-gray-700">
              Students haven't submitted any feedback for you yet. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sortedParameters = parameters
    .map(param => ({
      ...param,
      average: stats.parameterAverages[param.key] || 0,
    }))
    .sort((a, b) => b.average - a.average);

  const topStrengths = sortedParameters.slice(0, 5);
  const areasForImprovement = sortedParameters.slice(-5).reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {teacher.name}
        </h1>
        <p className="text-gray-600 mb-8">{teacher.subject}</p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8" />
              <h3 className="text-lg font-semibold">Total Feedback</h3>
            </div>
            <p className="text-4xl font-bold">{stats.totalFeedback}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-8 h-8" />
              <h3 className="text-lg font-semibold">Average Rating</h3>
            </div>
            <p className="text-4xl font-bold">{stats.averageRating.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8" />
              <h3 className="text-lg font-semibold">Performance</h3>
            </div>
            <p className="text-4xl font-bold">
              {stats.averageRating >= 4.5 ? 'Excellent' : stats.averageRating >= 4.0 ? 'Great' : 'Good'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <h3 className="text-lg font-semibold">Leaderboard</h3>
            </div>
            {stats.leaderboardRank ? (
              <div>
                <p className="text-4xl font-bold">#{stats.leaderboardRank}</p>
                <p className="text-sm opacity-90">of {stats.totalTeachers} teachers</p>
              </div>
            ) : (
              <p className="text-sm">Not ranked yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Top 5 Strengths</h2>
          </div>

          <div className="space-y-4">
            {topStrengths.map((param, index) => (
              <div key={param.key} className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">{param.label}</span>
                      <span className="text-lg font-bold text-green-600">{param.average.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-600"
                    style={{ width: `${(param.average / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Areas for Growth</h2>
          </div>

          <div className="space-y-4">
            {areasForImprovement.map((param, index) => (
              <div key={param.key} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">{param.label}</span>
                      <span className="text-lg font-bold text-orange-600">{param.average.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-orange-600"
                    style={{ width: `${(param.average / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">All Parameters Overview</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sortedParameters.map(param => (
            <div key={param.key} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{param.label}</span>
                <span className="text-sm font-bold text-gray-900">{param.average.toFixed(2)} / 5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    param.average >= 4.5
                      ? 'bg-green-500'
                      : param.average >= 4.0
                      ? 'bg-blue-500'
                      : param.average >= 3.5
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${(param.average / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {stats.recentComments.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Recent Comments</h2>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {stats.recentComments.map((comment, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {comment.studentEmail.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{comment.comment}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {comment.date}
                      </span>
                      <span>•</span>
                      <span>{comment.studentEmail.split('@')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
