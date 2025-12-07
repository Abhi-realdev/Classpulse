import { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase, Teacher } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface RatingParameter {
  key: string;
  label: string;
}

const ratingParameters: RatingParameter[] = [
  { key: 'clarity_explanation', label: 'Clarity of Explanation' },
  { key: 'simplification', label: 'Simplification of Complex Topics' },
  { key: 'examples_analogies', label: 'Use of Examples & Analogies' },
  { key: 'engagement', label: 'Engagement & Interaction' },
  { key: 'pace_teaching', label: 'Pace of Teaching' },
  { key: 'depth_knowledge', label: 'Depth of Knowledge' },
  { key: 'accuracy_info', label: 'Accuracy of Information' },
  { key: 'concept_reinforcement', label: 'Concept Reinforcement' },
  { key: 'problem_solving', label: 'Problem-Solving Guidance' },
  { key: 'clarity_instructions', label: 'Clarity of Instructions' },
  { key: 'patience_approachability', label: 'Patience & Approachability' },
  { key: 'motivation_encouragement', label: 'Motivation & Encouragement' },
  { key: 'adaptability', label: 'Adaptability' },
  { key: 'visual_aids', label: 'Visual Aids / Presentation Skills' },
  { key: 'technology_integration', label: 'Technology Integration' },
  { key: 'interactive_methods', label: 'Interactive Methods' },
  { key: 'helping_understand', label: 'Helping Students Understand' },
  { key: 'critical_thinking', label: 'Encouraging Critical Thinking' },
  { key: 'homework_support', label: 'Homework & Assignments Support' },
  { key: 'openness_feedback', label: 'Openness to Feedback' },
];

export default function FeedbackForm() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error loading teachers:', error);
        setError('Failed to load teachers: ' + (error.message || error.code || 'Unknown error'));
        setTeachers([]);
        return;
      }

      setTeachers(data || []);
      setError('');
    } catch (err: any) {
      console.error('Unexpected error loading teachers:', err);
      setError('Failed to load teachers: ' + (err?.message || String(err)));
      setTeachers([]);
    }
  };

  const handleTeacherChange = (teacherId: string) => {
    setSelectedTeacher(teacherId);
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
      setSubject(teacher.subject);
    }
  };

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeacher) {
      setError('Please select a teacher');
      return;
    }

    const allRatingsProvided = ratingParameters.every(param => ratings[param.key]);
    if (!allRatingsProvided) {
      setError('Please provide ratings for all parameters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const feedbackData = {
        teacher_id: selectedTeacher,
        student_email: user?.email || '',
        subject,
        ...ratings,
        comments,
      };

      const { error: insertError } = await supabase
        .from('feedback')
        .insert([feedbackData]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setRatings({});
      setComments('');
      setSelectedTeacher('');
      setSubject('');

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700 text-lg">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Teacher Feedback Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Teacher *
              </label>
              <select
                value={selectedTeacher}
                onChange={(e) => handleTeacherChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a teacher...</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Subject name"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rate the following parameters (1 = Poor, 5 = Excellent)
            </h3>

            <div className="space-y-4">
              {ratingParameters.map((param, index) => (
                <div key={param.key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <label className="text-sm font-medium text-gray-700 flex-1">
                      {index + 1}. {param.label}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(value => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRatingChange(param.key, value)}
                          className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                            ratings[param.key] === value
                              ? 'bg-blue-600 text-white scale-110 shadow-lg'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Share any additional thoughts or suggestions..."
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send className="w-5 h-5" />
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
