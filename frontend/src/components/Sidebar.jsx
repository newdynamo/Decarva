import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ship, ShoppingCart, Anchor, Laptop, Hammer, ExternalLink, Settings } from 'lucide-react';

const Sidebar = ({ isAdmin, onMenuEditClick }) => {
  const [menuItems, setMenuItems] = useState([]);

  const iconMap = {
    'co-fleeter': Ship,
    'marine-market': ShoppingCart,
    'shipping': Anchor,
    'it': Laptop,
    'shipbuilding': Hammer
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/menu');
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <aside className="sidebar glass">
      <div className="logo-container">
        <Anchor className="text-blue-400" size={32} color="#38bdf8" />
        <span className="logo-text">BADARO</span>
      </div>
      
      <p className="text-secondary text-xs uppercase tracking-wider mb-4 px-4 opacity-50">Main Menu</p>
      
      <ul className="nav-menu">
        {menuItems.map((item, index) => {
          const Icon = iconMap[item.id] || Anchor;
          return (
            <li 
              key={item.id} 
              className="nav-item"
              onClick={() => item.link !== '#' && window.open(item.link, '_blank')}
            >
              <Icon size={20} />
              <span>{item.name}</span>
              {item.link !== '#' && <ExternalLink size={12} className="ml-auto opacity-50" />}
            </li>
          );
        })}
      </ul>

      {isAdmin && (
        <div 
          onClick={onMenuEditClick}
          className="nav-item mt-4 border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/20 text-blue-400"
          style={{ cursor: 'pointer' }}
        >
          <Settings size={20} />
          <span className="font-bold text-xs uppercase tracking-widest">메뉴 관리</span>
        </div>
      )}
      
      <div className="mt-auto p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs font-medium text-blue-400 mb-1">Shipping Integrated Portal</p>
        <p className="text-[10px] text-slate-400">Total Maritime Solutions</p>
      </div>
    </aside>
  );
};

export default Sidebar;
