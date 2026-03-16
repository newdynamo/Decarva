import React, { useState, useEffect } from 'react';
import { X, Save, Link as LinkIcon, Ship, ShoppingCart, Anchor, Laptop, Hammer } from 'lucide-react';
import axios from 'axios';

const MenuManagementModal = ({ isOpen, onClose, user, onSaveSuccess }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const iconMap = {
    'co-fleeter': Ship,
    'marine-market': ShoppingCart,
    'shipping': Anchor,
    'it': Laptop,
    'shipbuilding': Hammer
  };

  useEffect(() => {
    if (isOpen) {
      fetchMenu();
    }
  }, [isOpen]);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/menu');
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleChange = (id, newLink) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, link: newLink } : item
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: user.token }
      };
      await axios.put('http://localhost:8800/api/menu', menuItems, config);
      onSaveSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving menu items:", error);
      alert("메뉴 수정을 저장하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LinkIcon size={24} className="text-blue-400" />
            사이드바 메뉴 링크 관리
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body py-4">
          <p className="text-sm text-slate-400 mb-6">
            사이드바 메뉴의 각 항목이 클릭되었을 때 이동할 외부 사이트 URL을 관리할 수 있습니다. 
            변경 사항은 저장 후 모든 사용자에게 적용됩니다.
          </p>
          
          <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {menuItems.map((item) => {
              const Icon = iconMap[item.id] || Anchor;
              return (
                <div key={item.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Icon size={18} />
                    </div>
                    <span className="font-bold text-slate-200">{item.name}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-blue-500 transition-colors pl-10"
                    />
                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer flex gap-3 justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            취소
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "저장 중..." : "변경 사항 저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuManagementModal;
