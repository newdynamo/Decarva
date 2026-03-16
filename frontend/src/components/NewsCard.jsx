import React from 'react';
import { ExternalLink, Calendar, Briefcase, Edit, Trash2 } from 'lucide-react';

const NewsCard = ({ news, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="news-card glass border border-slate-700 relative group">
      <div className="card-image-wrapper">
        <img src={news.image} alt={news.title} className="card-image" />
        <span className="category-tag glass">{news.category}</span>
        
        {isAdmin && (
          <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(news); }}
              className="p-2 bg-blue-600/90 hover:bg-blue-500 rounded-lg text-white shadow-lg backdrop-blur-sm"
              title="수정"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(news.id); }}
              className="p-2 bg-red-600/90 hover:bg-red-500 rounded-lg text-white shadow-lg backdrop-blur-sm"
              title="삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title line-clamp-2">{news.title}</h3>
        <p className="card-summary">{news.summary}</p>
        <div className="card-footer">
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={12} />
            <span>{news.source}</span>
          </div>
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={12} />
            <span>{news.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
