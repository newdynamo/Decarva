import React from 'react';
import { ChevronRight, Edit, Trash2 } from 'lucide-react';

const NewsList = ({ newsList, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="news-list">
      {newsList.map((news) => (
        <div key={news.id} className="list-item border border-transparent hover:border-slate-800 group relative">
          <img src={news.image} alt={news.title} className="list-image" />
          <div className="list-content">
            <div className="flex items-center gap-2 mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="text-[10px] uppercase font-bold text-blue-400">{news.category}</span>
              <span className="text-[10px] text-slate-500">•</span>
              <span className="text-[10px] text-slate-500">{news.source}</span>
            </div>
            <h3>{news.title}</h3>
            <p className="line-clamp-2">{news.summary.substring(0, 100)}...</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {isAdmin && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEdit(news)}
                  className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => onDelete(news.id)}
                  className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
            <ChevronRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
