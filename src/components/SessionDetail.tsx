import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { sessions } from '../data/sessions';

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const session = sessions.find(s => s.id === parseInt(id || '0'));
  
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Session non trouvée</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium mx-auto"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux sessions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour aux sessions
      </button>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{session.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {session.date}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {session.messages.map((message, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {message.content}
                </p>
                {message.timestamp && (
                  <p className="text-xs text-gray-500 mt-2">{message.timestamp}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}