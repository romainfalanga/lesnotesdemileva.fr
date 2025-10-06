import { Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionCardProps {
  id: number;
  title: string;
  date: string;
  summary: string;
}

export default function SessionCard({ id, title, date, summary }: SessionCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
      onClick={() => navigate(`/sessions/${id}`)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm ml-4">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
        
        <p className="text-gray-600 leading-relaxed mb-4">
          {summary}
        </p>
      </div>
    </div>
  );
}