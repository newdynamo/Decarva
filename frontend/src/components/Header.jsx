import React from 'react';
import { Search, Bell, User, LogOut, Shield } from 'lucide-react';

const Header = ({ onSearch, user, onLoginClick, onLogout }) => {
  return (
    <header className="glass">
      <div className="search-container">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="해운 뉴스, 선박 데이터 검색..." 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="relative cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </div>
        
        {user && user.user ? (
          <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Shield size={14} className="text-blue-400" />
              <span className="text-xs font-bold text-blue-400">ADMIN</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <User size={18} />
              <span>{user.user.email.split('@')[0]}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all text-slate-400"
              title="로그아웃"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div 
            onClick={onLoginClick}
            className="flex items-center gap-3 cursor-pointer group" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 group-hover:border-blue-500 transition-colors">
              <User size={18} className="text-slate-300" />
            </div>
            <span className="text-sm font-medium hover:text-blue-400 transition-colors">로그인</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
